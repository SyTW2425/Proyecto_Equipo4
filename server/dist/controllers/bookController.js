"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
// Obtener todos los libros
const getBooks = async (req, res) => {
    try {
        const books = await book_1.default.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id; // Obtén el ID del libro desde los parámetros de la ruta
        if (!bookId) {
            res.status(400).json({ message: "El ID del libro es obligatorio." });
            return;
        }
        // Busca el libro en la base de datos por su _id
        const book = await book_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ message: "Libro no encontrado." });
            return;
        }
        res.status(200).json(book); // Devuelve el libro encontrado
    }
    catch (error) {
        console.error("Error al obtener el libro:", error);
        res.status(500).json({ message: "Error al obtener el libro." });
    }
};
exports.getBookById = getBookById;
// Crear un nuevo libro
const createBook = async (req, res) => {
    try {
        const newBook = new book_1.default(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createBook = createBook;
// Actualizar un libro por ISBN
const updateBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const updatedBook = await book_1.default.findOneAndUpdate({ isbn }, req.body, {
            new: true, // Devuelve el documento actualizado
            runValidators: true, // Ejecuta validaciones del esquema
        });
        if (!updatedBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateBook = updateBook;
// Eliminar un libro por ISBN
const deleteBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const deletedBook = await book_1.default.findOneAndDelete({ isbn });
        if (!deletedBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteBook = deleteBook;
