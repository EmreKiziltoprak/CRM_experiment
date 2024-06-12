import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
  language: string
}

const initialState: LanguageState = {
  language: 'en',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
