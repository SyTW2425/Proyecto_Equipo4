import { Schema, model } from "mongoose";
const listSchema = new Schema({
    title: { type: String, required: true },
    history: [{ type: String, required: true }], // Array de strings para almacenar los títulos de los libros
    user: { type: Schema.Types.ObjectId, ref: "User", required: true } // Referencia al modelo de usuario
});
export const List = model("List", listSchema);
export default List;
