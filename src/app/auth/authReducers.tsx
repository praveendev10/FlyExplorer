// Login
export interface LoginState {
  email: string;
  password: string;
}
export type loginAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "RESET" };
export const loginInitialState: LoginState = {
  email: "",
  password: "",
};
export function loginReducer(
  state: LoginState,
  action: loginAction
): LoginState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET":
      return loginInitialState;
    default:
      return state;
  }
}

// Register
export interface RegisterState extends LoginState {
  username: string;
  gender: "" | "male" | "female" | "other";
  dateofbirth: string;
  country: string;
}
export const registerInitialState: RegisterState = {
  username: "",
  gender: "", // or "female" / "other"
  dateofbirth: "",
  country: "",
  email: "",
  password: "",
};
export type RegisterAction =
  | loginAction
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_GENDER"; payload: "male" | "female" | "other" }
  | { type: "SET_DOB"; payload: string }
  | { type: "SET_COUNTRY"; payload: string };

export function registerReducer(
  state: RegisterState,
  action: RegisterAction
): RegisterState {
  // Reuse loginReducer for login-related actions
  const loginActionTypes = ["SET_EMAIL", "SET_PASSWORD", "RESET"];
  if (loginActionTypes.includes(action.type)) {
    return loginReducer(state, action as loginAction) as RegisterState;
  }

  // Handle register-only actions
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_GENDER":
      return {
        ...state,
        gender: action.payload as "male" | "female" | "other",
      };
    case "SET_DOB":
      return { ...state, dateofbirth: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    default:
      return state;
  }
}
