import { Request, Response } from 'express';
import { Review } from '../models/review.js';
import mongoose from "mongoose";

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

// Metodo para obtener todas las reseñas de un libro
export const getReviewsByBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book } = req.query;

    if (!book) {
      res.status(400).json({ message: "El ID del libro es obligatorio." });
      return;
    }

    // Buscar todas las reseñas donde el campo `book` coincida
    const reviews = await Review.find({ book });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error al obtener reseñas por libro:", error);
    res.status(500).json({ message: "Error interno al obtener reseñas por libro." });
  }
};





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
// export const getReviewsByUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const reviews = await Review.find({ user: req.params.id });
//     res.json(reviews);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// }

export const getReviewsByUsernameQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.query.username as string; // Obtén el nombre de usuario desde la query string

    if (!username) {
      res.status(400).json({ message: "El nombre de usuario es obligatorio." });
      return;
    }

    // Asegúrate de filtrar por el campo `user` explícitamente
    const reviews = await Review.find({ user: username });

    if (!reviews || reviews.length === 0) {
      res.status(404).json({ message: "No se encontraron reseñas para este usuario." });
      return;
    }

    res.status(200).json(reviews);
  } catch (error: any) {
    console.error("Error al obtener reseñas por usuario:", error.message);
    res.status(500).json({ message: "Error interno al obtener reseñas por usuario.", error: error.message });
  }
};


