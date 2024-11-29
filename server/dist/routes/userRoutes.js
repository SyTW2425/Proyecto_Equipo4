"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Obtener todos los usuarios
router.get('/', userController_1.getUsers);
// Obtener un usuario por ID
router.get('/:id', userController_1.getUser);
// obtener usuario por su nombre de usuario
router.post('/login', userController_1.login);
router.post('/register', userController_1.createUser);
// Registrar un nuevo usuario (ruta POST)
router.get('/user', userController_1.verifyToken, userController_1.getUser);
exports.default = router;
