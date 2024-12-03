import { Review } from '../models/review.js';
// Metodo para obtener todas las reseñas
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Metodo para obtener una reseña por su id
export const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.json(review);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Metodo para obtener todas las reseñas de un libro
export const getReviewsByBook = async (req, res) => {
    try {
        const { book } = req.query;
        if (!book) {
            res.status(400).json({ message: "El ID del libro es obligatorio." });
            return;
        }
        // Buscar todas las reseñas donde el campo `book` coincida
        const reviews = await Review.find({ book });
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error("Error al obtener reseñas por libro:", error);
        res.status(500).json({ message: "Error interno al obtener reseñas por libro." });
    }
};
// Metodo para crear una reseña
export const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Metodo para actualizar una reseña
export const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(review);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Metodo para eliminar una reseña
export const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
// Metodo para obtener todas las reseñas de un usuario
export const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.params.id });
        res.json(reviews);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
