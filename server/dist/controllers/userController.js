"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.login = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
// Método para obtener todos los usuarios
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
// Método para obtener un usuario por su id
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
// Metodo para iniciar sesion
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.default;
        const userFound = await user.findOne({ username, password });
        if (userFound) {
            res.status(200).json(userFound);
        }
        else {
            res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.login = login;
// Método para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        // Validamos que los campos requeridos estén presentes
        const { username, name, lastname, email, password, creditCard } = req.body;
        // Crear una nueva instancia del modelo de usuario
        const newUser = new user_1.default({
            username,
            name,
            lastname,
            email,
            password, // Aquí podrías encriptar la contraseña antes de guardarla
            creditCard
        });
        // Guardar el usuario en la base de datos
        await newUser.save();
        // Responder con el usuario creado
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error });
    }
};
exports.createUser = createUser;
