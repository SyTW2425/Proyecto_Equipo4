"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Conexión a MongoDB
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
// Configuración de rutas sin prefijo '/api'
app.use(userRoutes_1.default);
app.use(listRoutes_1.default);
// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
