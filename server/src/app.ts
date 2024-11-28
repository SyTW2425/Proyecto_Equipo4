import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes'
import listRoutes from './routes/listRoutes';
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

// Conexión a MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Configuración de rutas '/users/register'
app.use('/users', userRoutes)
//app.use(listRoutes);

app.use('/reviews', reviewRoutes)


// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});