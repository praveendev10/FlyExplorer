import { Document, Types } from "mongoose";
export interface IBaseUser {
  username: string;
  email: string;

  gender: "male" | "female" | "other";
  dateofbirth: Date;
  age?: number;
  country: string;
}

export interface IUser extends Document, IBaseUser {
  _id: Types.ObjectId;
  isVerified: boolean;
  password: string;
}

export interface OtpData extends IBaseUser {
  hashedPassword: string;
  otp: string;
  otpExpiry: number;
  attemptsLeft: number;
}
