import { Router } from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController.js";
const router = Router();
// Obtener todos los libros
router.get("/", getBooks);
// Obtener un libro por su ISBN
router.get("/:id", getBookById);
// Crear un nuevo libro
router.post("/create", createBook);
// Actualizar un libro por su ISBN
router.put("/:id", updateBook);
// Eliminar un libro por su ISBN
router.delete("/:id", deleteBook);
export default router;
