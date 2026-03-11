import { Request, Response } from 'express';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { User } from '../models/user.js';

async function getAdminClient(): Promise<KcAdminClient> {
  const kcAdmin = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_URL || 'http://keycloak:8080',
    realmName: 'master',
  });
  await kcAdmin.auth({
    grantType: 'password',
    username: process.env.KEYCLOAK_ADMIN_USER || 'admin',
    password: process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin',
    clientId: 'admin-cli',
  });
  kcAdmin.setConfig({ realmName: process.env.KEYCLOAK_REALM || 'bookly' });
  return kcAdmin;
}

// Método para obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Devuelve el perfil del usuario autenticado (res.locals.user es el documento Mongoose)
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = res.locals.user;
  if (!user) {
    res.status(404).json({ message: 'Usuario no encontrado' });
    return;
  }
  res.status(200).json({ user });
};

// Método para registrar un nuevo usuario: crea en Keycloak y luego en MongoDB
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, name, lastname, email, password } = req.body;
  try {
    const kcAdmin = await getAdminClient();

    // 1. Crear usuario en Keycloak
    const { id: keycloakId } = await kcAdmin.users.create({
      username,
      email,
      firstName: name,
      lastName: lastname,
      enabled: true,
      credentials: [{ type: 'password', value: password, temporary: false }],
    });

    // 2. Crear documento en MongoDB con el keycloak_id obtenido
    const user = await User.create({
      keycloak_id: keycloakId,
      username,
      name,
      lastname,
      email,
    });

    res.status(201).json({ message: 'Usuario creado correctamente', user });
  } catch (error: any) {
    console.error('Error al crear usuario:', error);
    if (error?.response?.status === 409) {
      res.status(409).json({ message: 'El usuario o email ya existe' });
    } else {
      res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
  }
};
