import { Document, Schema, model } from "mongoose";
import crypto from "crypto";

export interface IUSer extends Document {
  name: String;
  email: String;
  password: String;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      set: (value: string) =>
        crypto.createHash("md5").update(value).digest("hex"),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);

export default model<IUSer>("User", UserSchema);
