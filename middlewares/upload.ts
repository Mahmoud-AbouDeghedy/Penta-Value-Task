import multer from "multer";
import util from "util";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

let uploadSingleFile = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 1.7,
	},
}).single("uploadedFile");

uploadSingleFile = util.promisify(uploadSingleFile);

let uploadMultipleFiles = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 1.7 },
}).array("uploadedFiles");

uploadMultipleFiles = util.promisify(uploadMultipleFiles);

export { uploadSingleFile, uploadMultipleFiles };
