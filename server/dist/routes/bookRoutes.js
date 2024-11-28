"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const router = (0, express_1.Router)();
// Obtener todos los libros
router.get("/", bookController_1.getBooks);
// Obtener un libro por su ISBN
router.get("/:id", bookController_1.getBookByIsbn);
// Crear un nuevo libro
router.post("/create", bookController_1.createBook);
// Actualizar un libro por su ISBN
router.put("/:id", bookController_1.updateBook);
// Eliminar un libro por su ISBN
router.delete("/:id", bookController_1.deleteBook);
exports.default = router;
