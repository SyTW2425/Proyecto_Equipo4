import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
    user: { type: String, required: true },
    book: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    created: { type: Date, default: Date.now }
});
export const Review = model("Review", reviewSchema);
export default Review;
