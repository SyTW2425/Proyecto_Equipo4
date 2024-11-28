import { Router } from 'express';
import { getReview, getReviews, getReviewsByUser, createReview, updateReview, deleteReview  } from '../controllers/reviewController'

const router = Router();

router.get('/', getReviews); // Obtiene todas las reseñas
router.get('/:id', getReview); // Obtiene una reseña por ID
router.post('/create', createReview); // Crea una nueva reseña
router.put('/:id', updateReview); // Actualiza una reseña existente
router.delete('/:id', deleteReview); // Elimina una reseña por ID

export default router;