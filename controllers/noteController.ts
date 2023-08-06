import { Request, Response, NextFunction } from "express";

import { User, Note, NoteMediaFile, NoteType } from "../models";

import { sendMails } from "../services/sendMails";

import { Op } from "sequelize";

import { schedule } from "node-cron";
import { Model } from "sequelize/types";

schedule(
	"0 0 * * *",
	async () => {
		console.log("running a task everyday at 12AM, Cairo time");

		const users = await User.findAndCountAll({
			where: {
				isReceivingMails: true,
			},
			include: [
				{
					model: Note,
					as: "notes",
					include: [
						{
							model: NoteType,
							as: "noteType",
						},
					],
				},
			],
		});

		const newUsers = users.rows.map((user: any) => {
			let types: { [key: string]: number } = {};
			if (user.notes.length > 0) {
				user.notes.map((note: any) => {
					types[note.noteType.typeName] =
						(types[note.noteType.typeName] || 0) + 1;
					return types;
				});
				let msg = "You got new ";
				for (const type in types) {
					msg += `${types[type]} ${type} notes, `;
				}
				return {
					email: user.email,
					msg: msg.substring(0, msg.length - 2),
				};
			}
		});

		newUsers.forEach(async (user) => {
			if (user) {
				let mailOptions = {
					from: process.env.NODEMAILER_SENDER_MAIL,
					to: user.email,
					subject: `DDD app: daily updates`,
					html: `<h2>Daily updates:</h2>
                <p>${user.msg}</p>`,
				};
				await sendMails(mailOptions);
			}
		});
	},
	{
		scheduled: true,
		timezone: "Africa/Cairo",
	}
);

const createNote = async (req: Request, res: Response) => {
	try {
		const { title, body } = req.body;

		const { user, type } = res.locals;

		const query =
			req.files && Array.isArray(req.files) && req.files.length > 0
				? [
						{
							title,
							body,
							noteTypeId: type.id,
							userId: user.id,
							noteMediaFiles: req.files.map((file) => {
								return { fileName: file.filename };
							}),
						},
						{
							include: [
								{
									model: NoteMediaFile,
									as: "noteMediaFiles",
								},
							],
						},
				  ]
				: [
						{
							title,
							body,
							typeId: type.id,
							userId: user.id,
						},
				  ];

		const note = await Note.create(...query);

		const mailOptions = {
			from: process.env.FROM_EMAIL,
			to: user.email,
			subject: `Guest Note App: ${title}`,
			html: `<h2>Note for you:</h2>
            <h3>${title}</h3>
            <p>${body}</p>`,
		};
		await sendMails(mailOptions);

		res.status(200).json({
			message: "Note sent successfully",
		});
	} catch (err: any) {
		if (err.code == "LIMIT_FILE_SIZE") {
			return res.status(500).json({
				message: "File size cannot be larger than 1.7MB!",
			});
		}

		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
};

const getUserNotes = async (req: Request, res: Response) => {
	try {
		const { id: userId } = res.locals.user;

		const offset = Number(req.query.offset) || 0;
		const limit = Number(req.query.limit) || 10;

		const { types } = req.query;

		let typeQuery = types
			? {
					id: types && types,
					isDisabled: false,
			  }
			: {
					isDisabled: false,
			  };

		const notes = await Note.findAndCountAll({
			where: {
				userId,
				createdAt: {
					[Op.and]: {
						[Op.lte]: new Date(new Date().getTime()),
						[Op.gte]: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
					},
				},
			},
			offset,
			limit,
			include: [
				{
					model: NoteType,
					as: "noteType",
					where: typeQuery,
					required: true,
				},
			],
		});

		res.status(200).json({
			message: "Notes fetched successfully",
			data: {
				notes,
			},
		});
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
};

const deleteUserNotes = async (req: Request, res: Response) => {
	try {
		const { notes } = req.query;

		await Note.destroy({ where: { id: notes } });

		res.status(200).json({
			message: "Notes deleted successfully",
		});
	} catch (err: any) {
		res.status(err.status || 500).json({
			message: err.message || "Something went wrong",
		});
	}
};

export { createNote, getUserNotes, deleteUserNotes };
