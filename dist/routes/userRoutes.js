"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const router = express_1.default.Router();
router.post("/createUser", userMiddleware_1.uploadUserPhoto, userMiddleware_1.validateUser, userController_1.createUser);
exports.default = router;
