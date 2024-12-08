import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  book: string; // Cambiado a string
  quantity: number;
}

interface CartDocument extends Document {
  user: string;
  items: CartItem[];
}

const cartSchema = new Schema<CartDocument>({
  user: { type: String, required: true },
  items: [
    {
      book: { type: String, required: true }, // Cambiado a string
      quantity: { type: Number, required: true },
    },
  ],
});

export const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
export default Cart;
