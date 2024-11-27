"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByUser = exports.deleteReview = exports.updateReview = exports.createReview = exports.getReview = exports.getReviews = void 0;
const review_1 = require("../models/review");
// Metodo para obtener todas las reseñas
const getReviews = async (req, res) => {
    try {
        const reviews = await review_1.Review.find();
        res.json(reviews);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getReviews = getReviews;
// Metodo para obtener una reseña por su id
const getReview = async (req, res) => {
    try {
        const review = await review_1.Review.findById(req.params.id);
        res.json(review);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getReview = getReview;
// Metodo para crear una reseña
const createReview = async (req, res) => {
    try {
        const review = new review_1.Review(req.body);
        await review.save();
        res.status(201).json(review);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.createReview = createReview;
// Metodo para actualizar una reseña
const updateReview = async (req, res) => {
    try {
        const review = await review_1.Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(review);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.updateReview = updateReview;
// Metodo para eliminar una reseña
const deleteReview = async (req, res) => {
    try {
        await review_1.Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.deleteReview = deleteReview;
// Metodo para obtener todas las reseñas de un usuario
const getReviewsByUser = async (req, res) => {
    try {
        const reviews = await review_1.Review.find({ user: req.params.id });
        res.json(reviews);
    }
    catch (error) {
        res.status(400).json(error);
    }
};
exports.getReviewsByUser = getReviewsByUser;
