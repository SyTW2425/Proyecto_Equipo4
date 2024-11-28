"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    book: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    created: { type: Date, default: Date.now }
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = exports.Review;
