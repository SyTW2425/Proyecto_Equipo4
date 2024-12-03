"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBookToList = exports.deleteList = exports.updateList = exports.createList = exports.getListById = exports.getLists = void 0;
const list_1 = __importDefault(require("../models/list"));
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
// Obtener todas las listas
const getLists = async (req, res) => {
    try {
        const lists = await list_1.default.find().populate("user", "username").populate("history", "title");
        res.status(200).json(lists);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las listas", error: error.message });
    }
};
exports.getLists = getLists;
// Obtener una lista por ID
const getListById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "El ID de la lista es obligatorio." });
            return;
        }
        const list = await list_1.default.findById(id).populate("user", "username").populate("history", "title");
        if (!list) {
            res.status(404).json({ message: "Lista no encontrada." });
            return;
        }
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la lista.", error: error.message });
    }
};
exports.getListById = getListById;
// Crear una nueva lista
const createList = async (req, res) => {
    try {
        const { title, username } = req.body;
        if (!title || !username) {
            res.status(400).json({ message: "El título y el nombre de usuario son obligatorios." });
            return;
        }
        const user = await user_1.default.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
        const newList = new list_1.default({ title, user: user._id });
        await newList.save();
        res.status(201).json({ message: "Lista creada exitosamente.", list: newList });
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la lista.", error: error.message });
    }
};
exports.createList = createList;
// Actualizar una lista por ID
const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, history } = req.body;
        const updatedList = await list_1.default.findByIdAndUpdate(id, { title, history }, { new: true, runValidators: true });
        if (!updatedList) {
            res.status(404).json({ message: "Lista no encontrada." });
            return;
        }
        res.status(200).json({ message: "Lista actualizada exitosamente.", list: updatedList });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la lista.", error: error.message });
    }
};
exports.updateList = updateList;
// Eliminar una lista por ID
const deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedList = await list_1.default.findByIdAndDelete(id);
        if (!deletedList) {
            res.status(404).json({ message: "Lista no encontrada." });
            return;
        }
        res.status(200).json({ message: "Lista eliminada exitosamente.", list: deletedList });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la lista.", error: error.message });
    }
};
exports.deleteList = deleteList;
// Agregar un libro a la lista
const addBookToList = async (req, res) => {
    try {
        const { listId, bookId } = req.body;
        if (!listId || !bookId) {
            res.status(400).json({ message: "El ID de la lista y del libro son obligatorios." });
            return;
        }
        const list = await list_1.default.findById(listId);
        if (!list) {
            res.status(404).json({ message: "Lista no encontrada." });
            return;
        }
        const book = await book_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({ message: "Libro no encontrado." });
            return;
        }
        if (!list.history.includes(bookId)) {
            list.history.push(bookId);
            await list.save();
        }
        else {
            res.status(400).json({ message: "El libro ya está en la lista." });
            return;
        }
        res.status(200).json({ message: "Libro añadido a la lista.", list });
    }
    catch (error) {
        res.status(500).json({ message: "Error al añadir el libro a la lista.", error: error.message });
    }
};
exports.addBookToList = addBookToList;
