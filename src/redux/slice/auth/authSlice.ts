import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initailState";
import {
  ILoginSuccess,
  ILoginPayload,
  IRegisterPayload,
  IVerifyOTP,
  IReSendOTP,
} from "../reducer";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginStart: (state, _action: PayloadAction<ILoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<ILoginSuccess>) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.msg;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerStart: (state, _action: PayloadAction<IRegisterPayload>) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.user = null;
      state.message = null;
    },
    registerSuccess: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.loading = false;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    verifyOTPStart: (state, _action: PayloadAction<IVerifyOTP>) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.user = null;
      state.message = null;
    },
    verifyOTPSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
    },
    verifyOTPFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resendOTPStart: (state, _action: PayloadAction<IReSendOTP>) => {
      state.loading = true;
      state.error = null;
      state.token = null;
      state.user = null;
      state.message = null;
    },
    resendOTPSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
    },
    resendOTPFaillure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.token = null;
      state.user = null;
      state.message = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  verifyOTPStart,
  verifyOTPSuccess,
  verifyOTPFailure,
  resendOTPStart,
  resendOTPSuccess,
  resendOTPFaillure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
