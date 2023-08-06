import express from "express";

import { sequelize } from "./db";
import userRouter from "./routes/userRoutes";
import noteRouter from "./routes/noteRoutes";

const app = express();

sequelize.sync({ alter: true });

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(3000, async () => {
	try {
		await sequelize.authenticate();
		console.log("DB connected successfully!");
	} catch (error) {
		console.error("Unable to connect to the database!!", error);
	}
	console.log("Server is running on port 3000");
});
