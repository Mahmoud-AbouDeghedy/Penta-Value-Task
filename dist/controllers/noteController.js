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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserNotes = exports.getUserNotes = exports.createNote = void 0;
const models_1 = require("../models");
const sendMails_1 = require("../services/sendMails");
const sequelize_1 = require("sequelize");
const node_cron_1 = require("node-cron");
(0, node_cron_1.schedule)("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("running a task everyday at 12AM, Cairo time");
    const users = yield models_1.User.findAndCountAll({
        where: {
            isReceivingMails: true,
        },
        include: [
            {
                model: models_1.Note,
                as: "notes",
                include: [
                    {
                        model: models_1.NoteType,
                        as: "noteType",
                    },
                ],
            },
        ],
    });
    const newUsers = users.rows.map((user) => {
        let types = {};
        if (user.notes.length > 0) {
            user.notes.map((note) => {
                types[note.noteType.typeName] =
                    (types[note.noteType.typeName] || 0) + 1;
                return types;
            });
            let msg = "You got new ";
            for (const type in types) {
                msg += `${types[type]} ${type} notes, `;
            }
            return {
                email: user.email,
                msg: msg.substring(0, msg.length - 2),
            };
        }
    });
    newUsers.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user) {
            let mailOptions = {
                from: process.env.NODEMAILER_SENDER_MAIL,
                to: user.email,
                subject: `DDD app: daily updates`,
                html: `<h2>Daily updates:</h2>
                <p>${user.msg}</p>`,
            };
            yield (0, sendMails_1.sendMails)(mailOptions);
        }
    }));
}), {
    scheduled: true,
    timezone: "Africa/Cairo",
});
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body } = req.body;
        const { user, type } = res.locals;
        const query = req.files && Array.isArray(req.files) && req.files.length > 0
            ? [
                {
                    title,
                    body,
                    noteTypeId: type.id,
                    userId: user.id,
                    noteMediaFiles: req.files.map((file) => {
                        return { fileName: file.filename };
                    }),
                },
                {
                    include: [
                        {
                            model: models_1.NoteMediaFile,
                            as: "noteMediaFiles",
                        },
                    ],
                },
            ]
            : [
                {
                    title,
                    body,
                    typeId: type.id,
                    userId: user.id,
                },
            ];
        const note = yield models_1.Note.create(...query);
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: user.email,
            subject: `Guest Note App: ${title}`,
            html: `<h2>Note for you:</h2>
            <h3>${title}</h3>
            <p>${body}</p>`,
        };
        yield (0, sendMails_1.sendMails)(mailOptions);
        res.status(200).json({
            message: "Note sent successfully",
        });
    }
    catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).json({
                message: "File size cannot be larger than 1.7MB!",
            });
        }
        res.status(err.status || 500).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.createNote = createNote;
const getUserNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = res.locals.user;
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;
        const { types } = req.query;
        let typeQuery = types
            ? {
                id: types && types,
                isDisabled: false,
            }
            : {
                isDisabled: false,
            };
        const notes = yield models_1.Note.findAndCountAll({
            where: {
                userId,
                createdAt: {
                    [sequelize_1.Op.and]: {
                        [sequelize_1.Op.lte]: new Date(new Date().getTime()),
                        [sequelize_1.Op.gte]: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            offset,
            limit,
            include: [
                {
                    model: models_1.NoteType,
                    as: "noteType",
                    where: typeQuery,
                    required: true,
                },
            ],
        });
        res.status(200).json({
            message: "Notes fetched successfully",
            data: {
                notes,
            },
        });
    }
    catch (err) {
        res.status(err.status || 500).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.getUserNotes = getUserNotes;
const deleteUserNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notes } = req.query;
        yield models_1.Note.destroy({ where: { id: notes } });
        res.status(200).json({
            message: "Notes deleted successfully",
        });
    }
    catch (err) {
        res.status(err.status || 500).json({
            message: err.message || "Something went wrong",
        });
    }
});
exports.deleteUserNotes = deleteUserNotes;
