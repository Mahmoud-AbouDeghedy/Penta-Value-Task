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
exports.validateDeleteUserNotes = exports.validateGetUserNotes = exports.validateNote = exports.uploadNoteFiles = void 0;
const upload_1 = require("./upload");
const noteValidation_1 = require("../validations/noteValidation");
const models_1 = require("../models");
const uploadNoteFiles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, upload_1.uploadMultipleFiles)(req, res, next);
        next();
    }
    catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(422).json({
                message: "File size cannot be larger than 1.7MB!",
            });
        }
        res.status(err.status || 500).json({
            message: `Could not upload files: ${req.file.originalname}. ${err}`,
        });
    }
});
exports.uploadNoteFiles = uploadNoteFiles;
const validateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, noteType, userId } = req.body;
        yield noteValidation_1.createNoteValidation.validateAsync({
            title,
            body,
            noteType,
            userId,
        });
        const user = yield models_1.User.findOne({ where: { id: userId } });
        const type = yield models_1.NoteType.findOne({ where: { typeName: noteType } });
        if (!user)
            throw { message: "User not found!!", status: 404 };
        if (!type)
            throw { message: "Note type not found!!", status: 404 };
        res.locals = { user, type };
        next();
    }
    catch (err) {
        res.status(err.status || 422).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.validateNote = validateNote;
const validateGetUserNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, types } = req.query;
        yield noteValidation_1.getNotesValidation.validateAsync({ userId, types });
        const user = yield models_1.User.findOne({ where: { id: userId } });
        if (!user)
            throw { message: "User not found!!", status: 404 };
        res.locals = { user };
        next();
    }
    catch (err) {
        res.status(err.status || 422).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.validateGetUserNotes = validateGetUserNotes;
const validateDeleteUserNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notes } = req.body;
        yield noteValidation_1.deleteNotesValidation.validateAsync({ notes });
        next();
    }
    catch (err) {
        res.status(err.status || 422).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.validateDeleteUserNotes = validateDeleteUserNotes;
