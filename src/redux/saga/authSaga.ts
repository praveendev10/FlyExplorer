import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
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
} from "../slice/auth/authSlice";
import axiosInstance from "@/utils/axiosInstance";
import {
  ILoginPayload,
  IRegisterPayload,
  IVerifyOTP,
  IReSendOTP,
} from "../slice/reducer";
function loginApi(data: ILoginPayload) {
  console.log(data);
  return axios.post("http://localhost:5000/api/login", data);
}
function verifyOTP(data: IVerifyOTP) {
  return axios.post("http://localhost:5000/api/verify-otp", data);
}
function registerApi(data: IRegisterPayload) {
  return axios.post("http://localhost:5000/api/registerUser", data);
}
function resendOTP(data: IReSendOTP) {
  return axios.post("http://localhost:5000/api/resend-otp", data);
}
function logoutApi(refreshToken: string | null) {
  return axiosInstance.post("/logout", { refreshToken });
}
function* handleLogin(action: ReturnType<typeof loginStart>): SagaIterator {
  try {
    const response = yield call(loginApi, action.payload);

    console.log("response", response.data.accessToken);

    localStorage.setItem("token", response.data.accessToken);

    yield put(loginSuccess(response.data));
    const tokens = localStorage.getItem("token");

    if (tokens) {
      console.log("Your access token:", tokens);
    } else {
      console.log("No token found — user might be logged out.");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e.response?.data?.msg);
    yield put(loginFailure(e.response?.data?.msg));
  }
}

function* handleRegister(
  action: ReturnType<typeof registerStart>
): SagaIterator {
  try {
    const response = yield call(registerApi, action.payload);

    console.log(response);
    yield put(registerSuccess(response.data.msg));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.response?.data?.message || e.message);
    yield put(registerFailure(e.response?.data?.msg || e.message));
  }
}

function* handleOTPVerify(
  action: ReturnType<typeof verifyOTPStart>
): SagaIterator {
  try {
    const response = yield call(verifyOTP, action.payload);
    console.log(response.data.msg);
    yield put(verifyOTPSuccess(response.data.msg));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put(verifyOTPFailure(e.response?.data?.msg || e.message));
  }
}

function* handleReSendOTP(
  action: ReturnType<typeof resendOTPStart>
): SagaIterator {
  try {
    const response = yield call(resendOTP, action.payload);
    console.log(response.data.msg);
    yield put(resendOTPSuccess(response.data.msg));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put(resendOTPFaillure(e.response?.data?.msg || e.message));
  }
}
function* handleLogout(): SagaIterator {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    // Optional: Call backend to invalidate token
    if (refreshToken) {
      yield call(logoutApi, refreshToken);

      console.log("Logout success");
      // ✅ Clear tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      yield put(logoutSuccess());

      // ✅ Redirect to login
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    yield put(logoutFailure(e.response?.data?.msg || e.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginStart.type, handleLogin);
  yield takeLatest(registerStart.type, handleRegister);
  yield takeLatest(verifyOTPStart.type, handleOTPVerify);
  yield takeLatest(resendOTPStart.type, handleReSendOTP);
  yield takeLatest(logoutStart.type, handleLogout);
}
