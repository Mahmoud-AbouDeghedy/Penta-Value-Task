import { Request, Response, NextFunction } from "express";

import { createUserValidation } from "../validations/userValidation";
import { uploadSingleFile } from "./upload";

const uploadUserPhoto = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await uploadSingleFile(req, res, next);

		next();
	} catch (err: any) {
		if (err.code == "LIMIT_FILE_SIZE") {
			return res.status(422).json({
				message: "Image size cannot be larger than 1.7MB!",
			});
		}

		res.status(err.status || 500).json({
			message: `Could not upload the photo: ${req.file!.originalname}. ${err}`,
		});
	}
};

const validateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let { name, email } = req.body;

		let valid = await createUserValidation.validateAsync({ name, email });

		next();
	} catch (err: any) {
		res.status(err.status || 422).json({
			message: err.message || "Something went wrong",
		});
	}
};
export { uploadUserPhoto, validateUser };
