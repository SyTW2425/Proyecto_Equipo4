"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController"); // Asegúrate de que este método esté exportado correctamente
const router = (0, express_1.Router)(); // Aseguramos que router tiene el tipo correcto
router.get("/users", async (req, res) => {
    res.send("API is working!");
});
router.post('/users', userController_1.createUser); // Usamos el controlador para manejar la solicitud POST
exports.default = router;
