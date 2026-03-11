import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import { getUser } from './controllers/userController.js';
import { verifyToken } from './middleware/keycloakAuth.js';
import reviewRoutes from './routes/reviewRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import listRoutes from './routes/listRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
  })
);

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(204).end();
});

// Conexión a MongoDB
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Configuración de rutas
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/books', bookRoutes);
app.use('/lists', listRoutes);
app.use('/cart', cartRoutes);

// Ruta protegida: valida el JWT de Keycloak y devuelve el perfil del usuario
app.get('/user', verifyToken, getUser);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
