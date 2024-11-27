"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listController_1 = require("../controllers/listController");
const router = (0, express_1.Router)();
// Ruta para obtener todas las listas de libros
router.get('/lists', listController_1.getLists);
// Ruta para obtener una lista de libros por ID
router.get('/lists/:id', listController_1.getList);
// Ruta para crear una nueva lista de libros
router.post('/lists', listController_1.createList);
// Ruta para actualizar una lista de libros por ID
router.put('/lists/:id', listController_1.updateList);
// Ruta para eliminar una lista de libros por ID
router.delete('/lists/:id', listController_1.deleteList);
exports.default = router;
