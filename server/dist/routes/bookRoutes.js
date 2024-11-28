"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const router = (0, express_1.Router)();
// Obtener todos los libros
router.get('/', bookController_1.getBooks);
// Obtener un libro por ISBN
router.get('/:isbn', bookController_1.getBookByIsbn);
// Crear un nuevo libro
router.post('/', bookController_1.createBook);
// Actualizar un libro por ISBN
router.put('/:isbn', bookController_1.updateBook);
// Eliminar un libro por ISBN
router.delete('/:isbn', bookController_1.deleteBook);
exports.default = router;
