"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.login = exports.verifyToken = exports.getUser = exports.getUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const SECRET_KEY = 'bookly_secret_key';
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
        const { id } = res.locals.user; // Obtén el ID del usuario del token
        // Recupera al usuario desde la base de datos
        const user = await user_1.default.findById(id).select('-password'); // Excluye la contraseña si existe
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la información del usuario', error });
    }
};
exports.getUser = getUser;
// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado o inválido' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Valida que el `id` sea un ObjectId válido
        if (!decoded || typeof decoded !== 'object' || !mongoose_1.default.Types.ObjectId.isValid(decoded.id)) {
            res.status(400).json({ message: 'Token inválido: ID no válido' });
            return;
        }
        // Guarda los datos decodificados en `res.locals`
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
        return;
    }
};
exports.verifyToken = verifyToken;
// Metodo para iniciar sesion
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.default.findOne({ username, password });
        if (user) {
            const payload = {
                id: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
            };
            // Generar el token JWT
            const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1h' });
            // Responder con el token y los datos del usuario (sin la contraseña)
            res.status(200).json({
                token,
                user: payload, // Solo enviamos los datos esenciales del usuario
            });
        }
        else {
            res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
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
