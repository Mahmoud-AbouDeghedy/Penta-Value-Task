"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFiles = exports.uploadSingleFile = void 0;
const multer_1 = __importDefault(require("multer"));
const util_1 = __importDefault(require("util"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
let uploadSingleFile = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1.7,
    },
}).single("uploadedFile");
exports.uploadSingleFile = uploadSingleFile;
exports.uploadSingleFile = uploadSingleFile = util_1.default.promisify(uploadSingleFile);
let uploadMultipleFiles = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 1.7 },
}).array("uploadedFiles");
exports.uploadMultipleFiles = uploadMultipleFiles;
exports.uploadMultipleFiles = uploadMultipleFiles = util_1.default.promisify(uploadMultipleFiles);
