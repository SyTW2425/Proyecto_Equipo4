import { Schema, model } from "mongoose";
const purchaseSchema = new Schema({
    user: { type: String, required: true },
    total_price: { type: Number, required: true },
    date: { type: String, required: true }
});
export const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
