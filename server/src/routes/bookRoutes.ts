import { Router } from 'express';
import { 
  getBooks, getBookByIsbn, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = Router();

// Obtener todos los libros
router.get('/', getBooks);

// Obtener un libro por ISBN
router.get('/:isbn', getBookByIsbn);

// Crear un nuevo libro
router.post('/', createBook);

// Actualizar un libro por ISBN
router.put('/:isbn', updateBook);

// Eliminar un libro por ISBN
router.delete('/:isbn', deleteBook);

export default router;
