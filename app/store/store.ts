// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './slices/registerSlice';
import languageReducer from './slices/languageSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
