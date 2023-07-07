"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PaletteMode } from "@mui/material";

export type ConfigurationState = {
  theme: PaletteMode;
};

const initialState: ConfigurationState = {
  theme: "light",
};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = configurationSlice.actions;
export const configurationSelector = (state: RootState) => state.configuration;
export default configurationSlice.reducer;
