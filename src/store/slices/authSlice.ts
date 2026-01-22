import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  isTokenExpired: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
  isTokenExpired: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isTokenExpired = false;
    },
    setToken(
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTokenExpired(state, action: PayloadAction<boolean>) {
      state.isTokenExpired = action.payload;
    },
  },
  // Async thunks (login, signup, refresh, etc.) to be added here
});

export const {
  logout,
  setToken,
  setUser,
  setError,
  setLoading,
  setTokenExpired,
} = authSlice.actions;
export default authSlice.reducer;
