"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteMediaFile = exports.NoteType = exports.Note = exports.User = void 0;
const userModel_1 = __importDefault(require("./userModel"));
exports.User = userModel_1.default;
const noteModel_1 = __importDefault(require("./noteModel"));
exports.Note = noteModel_1.default;
const noteTypeModel_1 = __importDefault(require("./noteTypeModel"));
exports.NoteType = noteTypeModel_1.default;
const noteMediaFileModel_1 = __importDefault(require("./noteMediaFileModel"));
exports.NoteMediaFile = noteMediaFileModel_1.default;
userModel_1.default.hasMany(noteModel_1.default, {
    foreignKey: "userId",
    as: "notes",
});
noteModel_1.default.belongsTo(userModel_1.default, {
    foreignKey: "userId",
    as: "user",
});
noteTypeModel_1.default.hasMany(noteModel_1.default, {
    foreignKey: "noteTypeId",
    as: "notes",
});
noteModel_1.default.belongsTo(noteTypeModel_1.default, {
    foreignKey: "noteTypeId",
    as: "noteType",
});
noteModel_1.default.hasMany(noteMediaFileModel_1.default, {
    foreignKey: "noteId",
    as: "noteMediaFiles",
});
noteMediaFileModel_1.default.belongsTo(noteModel_1.default, {
    foreignKey: "noteId",
    as: "note",
});
