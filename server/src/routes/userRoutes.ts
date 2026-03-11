import { Router } from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = Router();

// Obtener todos los usuarios
router.get('/', getUsers);

// Registrar un nuevo usuario (crea en Keycloak + MongoDB)
router.post('/register', createUser);

export default router;
