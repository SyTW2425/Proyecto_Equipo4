import { Router } from 'express';
import { getUsers, getUser, createUser, login } from '../controllers/userController';

const router = Router();

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario por ID
router.get('/:id', getUser);

// obtener usuario por su nombre de usuario
router.post('/login', login);

router.post('/register', createUser);
// Registrar un nuevo usuario (ruta POST)

export default router;
