import { Document, Schema, model } from "mongoose";

export interface PurchaseDocumentInterface extends Document {
  user: string;
  total_price: number;
  date: string;
}

const purchaseSchema = new Schema<PurchaseDocumentInterface>({
  user: { type: String, required: true},
  total_price: { type: Number, required: true },
  date: { type: String, required: true }
});

export const Purchase = model("Purchase", purchaseSchema);
export default Purchase;