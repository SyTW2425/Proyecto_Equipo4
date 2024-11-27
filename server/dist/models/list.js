"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    history: [{ type: String, required: true }], // Array de strings para almacenar los títulos de los libros
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true } // Referencia al modelo de usuario
});
exports.List = (0, mongoose_1.model)("List", listSchema);
exports.default = exports.List;
