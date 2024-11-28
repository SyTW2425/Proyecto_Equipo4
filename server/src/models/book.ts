import { Document, Schema, model } from "mongoose";

export interface BookDocumentInterface extends Document {
  _id: string; // _id es el identificador único
  title: string;
  author: string;
  description: string;
  publisher: string;
  year: number;
}

const bookSchema = new Schema<BookDocumentInterface>({
  _id: { type: String, required: true }, // Usar ISBN como _id si es necesario
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: false },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
});

export const Book = model<BookDocumentInterface>("Book", bookSchema);
export default Book;
