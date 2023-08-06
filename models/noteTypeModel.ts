import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const NoteType = sequelize.define("NoteType", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	isDisabled: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	typeName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});

export default NoteType;
