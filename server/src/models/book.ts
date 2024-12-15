import { Document, Schema, model } from "mongoose";

export interface BookDocumentInterface extends Document {
  _id: string; // _id es el identificador único (ISBN)
  title: string;
  author: string;
  description?: string;
  publisher: string;
  year: number;
  binding: string;
  pages: number;
  dimensions: string;
  language: string;
  price: number;
  image: string;
  categories: string[]; // Array de categorías
}

const bookSchema = new Schema<BookDocumentInterface>({
  _id: { type: String, required: true, unique: true }, // Usar ISBN como _id si es necesario
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  publisher: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 0 },
  binding: { type: String, required: true, enum: ["Hardcover", "Softcover"] },
  pages: { type: Number, required: true, min: 1 },
  dimensions: { type: String, required: true, trim: true },
  language: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true, trim: true },
  categories: { type: [String], required: false, default: [] }, // Array de categorías opcional
});

export const Book = model<BookDocumentInterface>("Book", bookSchema);
export default Book;
