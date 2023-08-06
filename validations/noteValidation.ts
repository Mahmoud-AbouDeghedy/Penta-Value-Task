import Joi from "joi";

const createNoteValidation = Joi.object({
	title: Joi.string().required().messages({
		"string.base": "Please enter a valid title",
		"string.empty": "Please enter note title",
		"any.required": "Please enter note title",
	}),

	body: Joi.string().required().messages({
		"string.base": "Please enter a valid note",
		"string.empty": "Please enter your note",
		"any.required": "Please enter your note",
	}),
	noteType: Joi.string().required().messages({
		"string.base": "Please enter a valid note type",
		"string.empty": "Please enter your note type",
		"any.required": "Please enter your note type",
	}),
	userId: Joi.number().required().messages({
		"number.base": "Please enter a valid user id",
		"any.required": "Please select a valid user id",
	}),
});

const getNotesValidation = Joi.object({
	userId: Joi.number().required().messages({
		"number.base": "Please enter a valid user id",
		"any.required": "Please select a valid user id",
	}),
	types: Joi.array().items(Joi.number()).messages({
		"array.base": "types must be array of integers",
	}),
});

const deleteNotesValidation = Joi.object({
	notes: Joi.array().items(Joi.number()).required().messages({
		"array.base": "notes must be array of integers",
	}),
});

export { createNoteValidation, getNotesValidation, deleteNotesValidation };
