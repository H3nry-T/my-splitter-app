import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface TextSplitterState {
  inputText: string;
  splitTexts: string[];
  splitOption: number;
}

const initialState: TextSplitterState = {
  inputText: "",
  splitTexts: [],
  splitOption: 0,
};

export const textSplitterSlice = createSlice({
  name: "textSplitter",
  initialState,
  reducers: {
    setInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },
    setSplitOption: (state, action: PayloadAction<number>) => {
      state.splitOption = action.payload;
    },
    splitText: (state) => {
      const words = state.inputText.trim().split(/\s+/);
      const wordCount = words.length;
      const parts = state.splitOption;
      if (parts <= 0 || wordCount === 0) {
        state.splitTexts = [];
        return;
      }

      if (wordCount <= parts) {
        state.splitTexts = words;
        return;
      }

      const size = Math.ceil(wordCount / parts);
      const result: string[] = [];

      for (let i = 0; i < wordCount; i += size) {
        result.push(words.slice(i, i + size).join(" "));
      }

      state.splitTexts = result;
    },
  },
});

export const { setInputText, setSplitOption, splitText } =
  textSplitterSlice.actions;

export const selectTextSplitter = (state: RootState) => state.textSplitter;

export default textSplitterSlice.reducer;
