import express from "express";

import { createUser } from "../controllers/userController";
import { uploadUserPhoto, validateUser } from "../middlewares/userMiddleware";

const router = express.Router();

router.post("/createUser", uploadUserPhoto, validateUser, createUser);

export default router;
