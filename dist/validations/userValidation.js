"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserValidation = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        "string.base": "Please enter a valid name",
        "string.empty": "Please enter your name",
        "any.required": "Please enter your name",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.base": "Please enter a valid email",
        "string.email": "Please enter a valid email",
        "string.empty": "Please enter your email",
        "any.required": "Please enter your email",
    }),
});
