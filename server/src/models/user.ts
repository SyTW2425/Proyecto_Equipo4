import { Document, Schema, model } from "mongoose";

export interface UserDocumentInterface extends Document {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  creditCard: string;
}

const userSchema = new Schema<UserDocumentInterface>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creditCard: { type: String}
});

export const User = model("User", userSchema);
export default User;