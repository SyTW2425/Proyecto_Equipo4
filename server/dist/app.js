"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userController_1 = require("./controllers/userController");
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
//importar cors
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080', // Permitir solicitudes desde este origen
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
}));
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).end(); // Responde con código 204 (No Content)
});
// Conexión a MongoDB
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
// Configuración de rutas
app.use('/users', userRoutes_1.default);
//app.use(listRoutes);
app.use('/reviews', reviewRoutes_1.default);
app.use('/books', bookRoutes_1.default);
app.use(userController_1.verifyToken);
app.get('/user', userController_1.verifyToken, userController_1.getUser);
// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
