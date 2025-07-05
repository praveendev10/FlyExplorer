import { AuthState } from "./reducer";
export const initialState: AuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  message: null,
};
