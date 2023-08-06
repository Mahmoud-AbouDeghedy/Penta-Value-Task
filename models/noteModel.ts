import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const Note = sequelize.define(
	"Note",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 20],
				notEmpty: true,
			},
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [2, 100],
			},
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		paranoid: true,
	}
);

export default Note;
