import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import { verifyToken, getUser } from './controllers/userController.js';
import reviewRoutes from './routes/reviewRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import listRoutes from './routes/listRoutes.js';
//importar cors
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', // Permitir solicitudes desde este origen
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
}));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(204).end();  // Responde con código 204 (No Content)
});


// Conexión a MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Configuración de rutas
app.use('/users', userRoutes)
//app.use(listRoutes);

app.use('/reviews', reviewRoutes)
app.use('/books', bookRoutes)

app.use(verifyToken);
app.get('/user', verifyToken, getUser);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;