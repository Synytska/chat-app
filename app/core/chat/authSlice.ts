import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
}

const initialState: AuthState = {
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = null;
    },
  },
});

export const { setUsername, logout } = authSlice.actions;

export default authSlice.reducer;
