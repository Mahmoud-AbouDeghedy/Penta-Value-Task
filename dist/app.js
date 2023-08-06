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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const app = (0, express_1.default)();
db_1.sequelize.sync({ alter: true });
app.use(express_1.default.json());
app.use("/users", userRoutes_1.default);
app.use("/notes", noteRoutes_1.default);
app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.sequelize.authenticate();
        console.log("DB connected successfully!");
    }
    catch (error) {
        console.error("Unable to connect to the database!!", error);
    }
    console.log("Server is running on port 3000");
}));
