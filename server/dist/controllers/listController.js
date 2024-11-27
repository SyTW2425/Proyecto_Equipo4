"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.createList = exports.getList = exports.getLists = void 0;
const list_1 = __importDefault(require("../models/list"));
// Obtener todas las listas de libros
const getLists = async (req, res) => {
    try {
        const lists = await list_1.default.find().populate("user", "username email");
        res.json(lists);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getLists = getLists;
// Obtener una lista de libros por su ID
const getList = async (req, res) => {
    try {
        const list = await list_1.default.findById(req.params.id).populate("user", "username email");
        res.json(list);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getList = getList;
// Crear una nueva lista de libros
const createList = async (req, res) => {
    try {
        const list = new list_1.default(req.body);
        await list.save();
        res.status(201).json(list);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.createList = createList;
// Actualizar una lista de libros por su ID
const updateList = async (req, res) => {
    try {
        const list = await list_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(list);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.updateList = updateList;
// Eliminar una lista de libros por su ID
const deleteList = async (req, res) => {
    try {
        await list_1.default.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.deleteList = deleteList;
