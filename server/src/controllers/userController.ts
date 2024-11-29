import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const SECRET_KEY = 'bookly_secret_key';

// Método para obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Método para obtener un usuario por su id
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = res.locals.user; // Obtén el ID del usuario del token

    // Recupera al usuario desde la base de datos
    const user = await User.findById(id).select('-password'); // Excluye la contraseña si existe
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la información del usuario', error });
  }
};

// Middleware para verificar el token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado o inválido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Valida que el `id` sea un ObjectId válido
    if (!decoded || typeof decoded !== 'object' || !mongoose.Types.ObjectId.isValid((decoded as any).id)) {
      res.status(400).json({ message: 'Token inválido: ID no válido' });
      return;
    }

    // Guarda los datos decodificados en `res.locals`
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado' });
    return;
  }
};

// Metodo para iniciar sesion
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username, password });

    if (user) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        lastname: user.lastname, 
      };

      // Generar el token JWT
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

      // Responder con el token y los datos del usuario (sin la contraseña)
      res.status(200).json({
        token,
        user: payload, // Solo enviamos los datos esenciales del usuario
      });
    } else {
      res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Método para crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validamos que los campos requeridos estén presentes
    const { username, name, lastname, email, password, creditCard } = req.body;
    
    // Crear una nueva instancia del modelo de usuario
    const newUser = new User({
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
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el usuario', error });
  }
};
