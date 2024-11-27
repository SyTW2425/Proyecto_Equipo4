import { Request, Response } from 'express';
import { Review } from '../models/review';

// Metodo para obtener todas las reseñas
export const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Metodo para obtener una reseña por su id
export const getReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findById(req.params.id);
    res.json(review);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Metodo para crear una reseña
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Metodo para actualizar una reseña
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Metodo para eliminar una reseña
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json(error);
  }
}

// Metodo para obtener todas las reseñas de un usuario
export const getReviewsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ user: req.params.id });
    res.json(reviews);
  } catch (error) {
    res.status(400).json(error);
  }
}
