import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const initialState: string[] = ['1', '2'];

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      return [action.payload, ...state]
    }
  }
});

export const { addWord } = wordsSlice.actions;

export const getWordsSelector = (state: RootState) => state.words;

export default wordsSlice.reducer;