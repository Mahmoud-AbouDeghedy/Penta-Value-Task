"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const noteMiddleware_1 = require("../middlewares/noteMiddleware");
const router = express_1.default.Router();
router.post("/createNote", noteMiddleware_1.uploadNoteFiles, noteMiddleware_1.validateNote, noteController_1.createNote);
router.get("/getUserNotes", noteMiddleware_1.validateGetUserNotes, noteController_1.getUserNotes);
router.delete("/deleteUserNotes", noteMiddleware_1.validateDeleteUserNotes, noteController_1.deleteUserNotes);
exports.default = router;
