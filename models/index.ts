import User from "./userModel";
import Note from "./noteModel";
import NoteType from "./noteTypeModel";
import NoteMediaFile from "./noteMediaFileModel";

User.hasMany(Note, {
	foreignKey: "userId",
	as: "notes",
});

Note.belongsTo(User, {
	foreignKey: "userId",
	as: "user",
});

NoteType.hasMany(Note, {
	foreignKey: "noteTypeId",
	as: "notes",
});

Note.belongsTo(NoteType, {
	foreignKey: "noteTypeId",
	as: "noteType",
});

Note.hasMany(NoteMediaFile, {
	foreignKey: "noteId",
	as: "noteMediaFiles",
});

NoteMediaFile.belongsTo(Note, {
	foreignKey: "noteId",
	as: "note",
});

export { User, Note, NoteType, NoteMediaFile };
