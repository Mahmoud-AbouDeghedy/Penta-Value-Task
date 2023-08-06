import { Sequelize } from "sequelize";
require("dotenv").config();

export const sequelize = new Sequelize(
	`postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
);
