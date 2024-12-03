import { Router } from 'express';
import {
  getLists,
  getListById,
  createList,
  updateList,
  deleteList,
  addBookToList,
} from '../controllers/listController';

const router: Router = Router();

// Ruta para obtener todas las listas de libros
router.get('/', getLists);

// Ruta para obtener una lista de libros por ID
router.get('/:id', getListById);

// Ruta para crear una nueva lista de libros
router.post('/', createList);

// Ruta para actualizar una lista de libros por ID
router.put('/:id', updateList);

// Ruta para eliminar una lista de libros por ID
router.delete('/:id', deleteList);

// Ruta para añadir un libro a una lista
router.post('/add-book', addBookToList);

export default router;
