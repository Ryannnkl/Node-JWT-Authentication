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
    holder: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pai",
      },
    ],
    childs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pai",
      },
    ],
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
      set: (password: string) =>
        crypto.createHash("md5").update(password).digest("hex"),
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
