export interface IUser {
  id: string;
  username: string;
  email: string;
}
export interface AuthState {
  loading: boolean;
  user: IUser | null;
  token: string | null;
  error: string | null;
  message: string | null;
}

export interface ILoginSuccess {
  user: IUser;
  token: string;
  msg: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
  gender: "" | "male" | "female" | "other";
  dateofbirth: string;
  country: string;
}
export interface IReSendOTP {
  email: string;
}
export interface IVerifyOTP extends IReSendOTP {
  otp: string;
}
export interface IRefreshToken {
  token: string;
}
