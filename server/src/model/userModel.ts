import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
