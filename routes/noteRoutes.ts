import express from "express";

import {
	createNote,
	getUserNotes,
	deleteUserNotes,
} from "../controllers/noteController";

import {
	validateGetUserNotes,
	uploadNoteFiles,
	validateNote,
	validateDeleteUserNotes,
} from "../middlewares/noteMiddleware";

const router = express.Router();

router.post("/createNote", uploadNoteFiles, validateNote, createNote);

router.get("/getUserNotes", validateGetUserNotes, getUserNotes);

router.delete("/deleteUserNotes", validateDeleteUserNotes, deleteUserNotes);

export default router;
