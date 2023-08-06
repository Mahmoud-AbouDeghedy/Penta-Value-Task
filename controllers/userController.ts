import { Request, Response } from "express";

import { User } from "../models";

export const createUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { name, email } = req.body;

		if (!req.file)
			return res
				.status(400)
				.json({ msg: "No image uploaded!, please upload an image" });

		const user = await User.create({
			name,
			profilePicture: `${req.file.path}`,
			email,
		});

		return res
			.status(201)
			.json({ message: `User ${name} created successfully` });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};
