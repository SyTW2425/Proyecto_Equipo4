import { Schema, model } from "mongoose";
const bookSchema = new Schema({
    _id: { type: String, required: true, unique: true }, // Usar ISBN como _id si es necesario
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: false },
    publisher: { type: String, required: true },
    year: { type: Number, required: true },
    binding: { type: String, required: true },
    pages: { type: Number, required: true },
    dimensions: { type: String, required: true },
    language: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, requited: true }
});
export const Book = model("Book", bookSchema);
export default Book;
