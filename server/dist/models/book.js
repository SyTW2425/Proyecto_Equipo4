"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    _id: { type: String, required: true }, // Usar ISBN como _id si es necesario
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: false },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = exports.Book;
