import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const NoteMediaFile = sequelize.define("NoteMediaFile", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	fileName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});

export default NoteMediaFile;
