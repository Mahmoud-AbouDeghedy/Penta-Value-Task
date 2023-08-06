import nodemailer, { TransportOptions } from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

export const sendMails = async (mailOptions: Options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.NODEMAILER_HOST,
		port: process.env.NODEMAILER_PORT,
		secure: false,
		auth: {
			user: process.env.NODEMAILER_USERNAME,
			pass: process.env.NODEMAILER_PASSWORD,
		},
	} as TransportOptions);

	transporter.sendMail(mailOptions, function (error, data) {
		if (!error) {
			console.log(`Email is sent successfully to ${mailOptions.to}`);
		} else {
			console.log(`Email is not sent to ${mailOptions.to}`);
			console.log(error.message);
		}
	});
};
