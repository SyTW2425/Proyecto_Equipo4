import { Document, Schema, model } from "mongoose";

export interface BookDocumentInterface extends Document {
  isbn: string;  // ISBN será el ID
  title: string;
  author: string;
  description: string;
  publisher: string;
  year: number;
}

const bookSchema = new Schema<BookDocumentInterface>({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true},
  year: { type: Number, required: true }
}, {
  _id: false // Para quitar el campo _id por defecto.
});

bookSchema.index({ isbn: 1}, {unique: true}) // Dejar el ISBN como id.

export const Book = model("Book", bookSchema);
export default Book;