// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } = userSlice.actions;

export default userSlice.reducer;

export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }
  