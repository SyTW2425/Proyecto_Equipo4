"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Obtener todos los usuarios
router.get('/', userController_1.getUsers);
// Obtener un usuario por ID
router.get('/:id', userController_1.getUser);
// Registrar un nuevo usuario (ruta POST)
router.post('/register', userController_1.createUser);
exports.default = router;
