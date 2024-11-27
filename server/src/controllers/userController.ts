import { Request, Response } from 'express';
import User from '../models/user';

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
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

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
