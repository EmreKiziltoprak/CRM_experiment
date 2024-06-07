import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile } from '../../../pages/profile/interface';

interface UserState {
  profile: IUserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchProfileStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action: PayloadAction<IUserProfile | null>) { 
      state.isLoading = false;
      state.profile = action.payload;
    },
    fetchProfileFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } = userSlice.actions;

export default userSlice.reducer;
