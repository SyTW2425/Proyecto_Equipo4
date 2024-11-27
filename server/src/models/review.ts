import { Document, Schema, model } from "mongoose";

export interface ReviewDocumentInterface extends Document {
  user: string;
  book: string;
  title: string;
  description: string;
  rating: number;
  likes: number;
  created: Date;
}

const reviewSchema = new Schema<ReviewDocumentInterface>({
  user: { type: String, required: true },
  book: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

export const Review = model("Review", reviewSchema);
export default Review;