"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.uploadUserPhoto = void 0;
const userValidation_1 = require("../validations/userValidation");
const upload_1 = require("./upload");
const uploadUserPhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, upload_1.uploadSingleFile)(req, res, next);
        next();
    }
    catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(422).json({
                message: "Image size cannot be larger than 1.7MB!",
            });
        }
        res.status(err.status || 500).json({
            message: `Could not upload the photo: ${req.file.originalname}. ${err}`,
        });
    }
});
exports.uploadUserPhoto = uploadUserPhoto;
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, email } = req.body;
        let valid = yield userValidation_1.createUserValidation.validateAsync({ name, email });
        next();
    }
    catch (err) {
        res.status(err.status || 422).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.validateUser = validateUser;
