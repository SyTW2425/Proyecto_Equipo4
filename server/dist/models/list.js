<<<<<<< HEAD
import { Schema, model } from "mongoose";
const listSchema = new Schema({
    title: { type: String, required: true },
    history: [{ type: String, required: true }], // Array de strings para almacenar los títulos de los libros
    user: { type: Schema.Types.ObjectId, ref: "User", required: true } // Referencia al modelo de usuario
=======
"use strict";
// import { Document, Schema, model } from "mongoose";
// import { UserDocumentInterface } from "./user";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
// export interface ListDocumentInterface extends Document {
//   title: string;
//   history: string[]; // Array de IDs de libros o títulos de libros
//   user: UserDocumentInterface["_id"]; // Relación con el usuario propietario de la lista
// }
// const listSchema = new Schema<ListDocumentInterface>({
//   title: { type: String, required: true },
//   history: [{ type: String, required: true }], // Array de strings para almacenar los títulos de los libros
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true } // Referencia al modelo de usuario
// });
// export const List = model("List", listSchema);
// export default List;
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    history: [{ type: String }], // Array de strings para almacenar los IDs de libros
    user: { type: String, required: true }, // ID del usuario como string
>>>>>>> aa73d0c66b2fed30cc79dcd2687b4831772d72db
});
export const List = model("List", listSchema);
export default List;
