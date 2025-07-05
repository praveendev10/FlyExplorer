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
  return axiosInstance.post("/login", data); // ✅ FIXED
}

function verifyOTP(data: IVerifyOTP) {
  return axiosInstance.post("/verify-otp", data); // ✅ FIXED
}

function registerApi(data: IRegisterPayload) {
  return axiosInstance.post("/registerUser", data); // ✅ FIXED
}

function resendOTP(data: IReSendOTP) {
  return axiosInstance.post("/resend-otp", data); // ✅ FIXED
}
function logoutApi(refreshToken: string) {
  console.log("🔥 Calling /logout with refreshToken:", refreshToken);
  return axiosInstance.post("/logout", { refreshToken }); // ✅ Correct
}

function* handleLogin(action: ReturnType<typeof loginStart>): SagaIterator {
  try {
    const response = yield call(loginApi, action.payload);

    console.log("response", response.data.accessToken);

    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
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
    console.log("🚀 Logout saga running");

    const refreshToken = localStorage.getItem("refreshToken");
    console.log("📦 Refresh Token:", refreshToken);

    if (!refreshToken) {
      console.warn("❌ No refresh token found");
      return;
    }

    yield call(logoutApi, refreshToken); // 🔥 this uses axiosInstance

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    yield put(logoutSuccess());

    console.log("✅ Logout done, redirecting...");
    window.location.href = "auth/login";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("❌ Logout failed:", e.message);
    yield put(logoutFailure(e.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginStart.type, handleLogin);
  yield takeLatest(registerStart.type, handleRegister);
  yield takeLatest(verifyOTPStart.type, handleOTPVerify);
  yield takeLatest(resendOTPStart.type, handleReSendOTP);
  yield takeLatest(logoutStart.type, handleLogout);
}
