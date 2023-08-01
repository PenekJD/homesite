import { configureStore } from "@reduxjs/toolkit";
import words from '../Components/words/words.slice';

const store = configureStore({
  reducer: {
    words
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;