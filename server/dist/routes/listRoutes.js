"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listController_1 = require("../controllers/listController");
const router = (0, express_1.Router)();
// Ruta para obtener todas las listas de libros
router.get('/', listController_1.getLists);
// Ruta para obtener una lista de libros por ID
router.get('/:id', listController_1.getListById);
// Ruta para crear una nueva lista de libros
router.post('/', listController_1.createList);
// Ruta para actualizar una lista de libros por ID
router.put('/:id', listController_1.updateList);
// Ruta para eliminar una lista de libros por ID
router.delete('/:id', listController_1.deleteList);
// Ruta para añadir un libro a una lista
router.post('/add-book', listController_1.addBookToList);
exports.default = router;
