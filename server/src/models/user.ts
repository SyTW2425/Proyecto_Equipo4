import { Document, Schema, model } from "mongoose";

export interface UserDocumentInterface extends Document {
  keycloak_id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  creditCard: string;
}

const userSchema = new Schema<UserDocumentInterface>({
  keycloak_id: { type: String, required: true, unique: true },
  username:    { type: String, required: true, unique: true },
  name:        { type: String, default: '' },
  lastname:    { type: String, default: '' },
  email:       { type: String, required: true, unique: true },
  creditCard:  { type: String },
});

export const User = model<UserDocumentInterface>("User", userSchema);
export default User;
