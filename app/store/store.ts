// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/registerSlice'; // Corrected import
import languageReducer from './slices/languageSlice';
import userProfileReducer from './slices/userSlice';
import { api } from './api/apiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    profile: userProfileReducer,
    [api.reducerPath]: api.reducer, // Add api.reducerPath here

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
