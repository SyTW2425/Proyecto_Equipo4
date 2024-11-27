"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true }
}, {
    _id: false // Para quitar el campo _id por defecto.
});
bookSchema.index({ isbn: 1 }, { unique: true }); // Dejar el ISBN como id.
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = exports.Book;
