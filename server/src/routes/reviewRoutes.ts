import { Router } from 'express';
import { getReview, getReviews, getReviewsByUsernameQuery, createReview, updateReview, deleteReview, getReviewsByBook} from '../controllers/reviewController.js'

const router = Router();

router.get('/', getReviews); // Obtiene todas las reseñas

// Obtiene reseñas filtradas por libro (usando query `book`)
router.get('/by-book', getReviewsByBook);
router.get('/by-username', getReviewsByUsernameQuery);

router.get('/:id', getReview); // Obtiene una reseña por ID
router.post('/create', createReview); // Crea una nueva reseña
router.put('/:id', updateReview); // Actualiza una reseña existente
router.delete('/:id', deleteReview); // Elimina una reseña por ID


export default router;