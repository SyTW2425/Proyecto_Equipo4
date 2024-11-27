import { Router } from 'express';
import {
  getLists,
  getList,
  createList,
  updateList,
  deleteList
} from '../controllers/listController';

const router: Router = Router();

// Ruta para obtener todas las listas de libros
router.get('/lists', getLists);

// Ruta para obtener una lista de libros por ID
router.get('/lists/:id', getList);

// Ruta para crear una nueva lista de libros
router.post('/lists', createList);

// Ruta para actualizar una lista de libros por ID
router.put('/lists/:id', updateList);

// Ruta para eliminar una lista de libros por ID
router.delete('/lists/:id', deleteList);

export default router;
