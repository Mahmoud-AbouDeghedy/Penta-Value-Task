import { Request, Response, NextFunction } from "express";

import { uploadMultipleFiles } from "./upload";
import {
	createNoteValidation,
	getNotesValidation,
	deleteNotesValidation,
} from "../validations/noteValidation";
import { User, NoteType } from "../models";

const uploadNoteFiles = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await uploadMultipleFiles(req, res, next);

		next();
	} catch (err: any) {
		if (err.code == "LIMIT_FILE_SIZE") {
			return res.status(422).json({
				message: "File size cannot be larger than 1.7MB!",
			});
		}

		res.status(err.status || 500).json({
			message: `Could not upload files: ${req.file!.originalname}. ${err}`,
		});
	}
};

const validateNote = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { title, body, noteType, userId } = req.body;

		await createNoteValidation.validateAsync({
			title,
			body,
			noteType,
			userId,
		});

		const user = await User.findOne({ where: { id: userId } });
		const type = await NoteType.findOne({ where: { typeName: noteType } });

		if (!user) throw { message: "User not found!!", status: 404 };
		if (!type) throw { message: "Note type not found!!", status: 404 };

		res.locals = { user, type };
		next();
	} catch (err: any) {
		res.status(err.status || 422).json({
			message: err.message || "Something went wrong",
		});
	}
};

const validateGetUserNotes = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId, types } = req.query;

		await getNotesValidation.validateAsync({ userId, types });

		const user = await User.findOne({ where: { id: userId } });
		if (!user) throw { message: "User not found!!", status: 404 };

		res.locals = { user };
		next();
	} catch (err: any) {
		res.status(err.status || 422).json({
			message: err.message || "Something went wrong",
		});
	}
};

const validateDeleteUserNotes = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { notes } = req.body;

		await deleteNotesValidation.validateAsync({ notes });

		next();
	} catch (err: any) {
		res.status(err.status || 422).json({
			message: err.message || "Something went wrong",
		});
	}
};

export {
	uploadNoteFiles,
	validateNote,
	validateGetUserNotes,
	validateDeleteUserNotes,
};
