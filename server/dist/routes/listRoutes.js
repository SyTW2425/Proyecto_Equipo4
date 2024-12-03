import { Router } from 'express';
import { getLists, getList, createList, updateList, deleteList } from '../controllers/listController.js';
const router = Router();
// Ruta para obtener todas las listas de libros
<<<<<<< HEAD
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
=======
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
>>>>>>> aa73d0c66b2fed30cc79dcd2687b4831772d72db
