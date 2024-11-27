"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
// Metodo para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await user_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getUsers = getUsers;
// Metodo para obtener un usuario por su id
const getUser = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getUser = getUser;
// Metodo para crear un usuario
const createUser = async (req, res) => {
    try {
        const user = new user_1.default(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.createUser = createUser;
