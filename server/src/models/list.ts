import { Document, Schema, model } from "mongoose";
import { UserDocumentInterface } from "./user";

export interface ListDocumentInterface extends Document {
  title: string;
  history: string[]; // Array de IDs de libros o títulos de libros
  user: UserDocumentInterface["_id"]; // Relación con el usuario propietario de la lista
}

const listSchema = new Schema<ListDocumentInterface>({
  title: { type: String, required: true },
  history: [{ type: String, required: true }], // Array de strings para almacenar los títulos de los libros
  user: { type: Schema.Types.ObjectId, ref: "User", required: true } // Referencia al modelo de usuario
});

export const List = model("List", listSchema);
export default List;
