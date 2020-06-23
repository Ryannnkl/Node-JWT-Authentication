import { Document, Schema, model } from "mongoose";

export interface IUSer extends Document {
  name: String;
  email: String;
  password: String;
}

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

export default model<IUSer>("User", UserSchema);
