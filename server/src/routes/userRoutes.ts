import { Router } from 'express';
import { getUsers, getUser, createUser } from '../controllers/userController';

const router = Router();

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario por ID
router.get('/:id', getUser);

// Registrar un nuevo usuario (ruta POST)
router.post('/register', createUser);

export default router;
