"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotesValidation = exports.getNotesValidation = exports.createNoteValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createNoteValidation = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.base": "Please enter a valid title",
        "string.empty": "Please enter note title",
        "any.required": "Please enter note title",
    }),
    body: joi_1.default.string().required().messages({
        "string.base": "Please enter a valid note",
        "string.empty": "Please enter your note",
        "any.required": "Please enter your note",
    }),
    noteType: joi_1.default.string().required().messages({
        "string.base": "Please enter a valid note type",
        "string.empty": "Please enter your note type",
        "any.required": "Please enter your note type",
    }),
    userId: joi_1.default.number().required().messages({
        "number.base": "Please enter a valid user id",
        "any.required": "Please select a valid user id",
    }),
});
exports.createNoteValidation = createNoteValidation;
const getNotesValidation = joi_1.default.object({
    userId: joi_1.default.number().required().messages({
        "number.base": "Please enter a valid user id",
        "any.required": "Please select a valid user id",
    }),
    types: joi_1.default.array().items(joi_1.default.number()).messages({
        "array.base": "types must be array of integers",
    }),
});
exports.getNotesValidation = getNotesValidation;
const deleteNotesValidation = joi_1.default.object({
    notes: joi_1.default.array().items(joi_1.default.number()).required().messages({
        "array.base": "notes must be array of integers",
    }),
});
exports.deleteNotesValidation = deleteNotesValidation;
