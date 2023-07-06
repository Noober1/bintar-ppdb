"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export type MultiDialogState = {
  title?: string;
  content?: React.ReactNode;
  disableDrag?: boolean;
  disableOutsideClick?: boolean;
  // confirm
  confirmButton?: string;
  confirmCallback?: () => void;
  confirmButtonColor?: ButtonColor;
  // cancel
  showCancelButton?: boolean;
  // reject
  rejectButton?: string;
  rejectCallback?: () => void;
  rejectButtonColor?: ButtonColor;
};

const initialState: MultiDialogState[] = [];

export const multiDialogSlice = createSlice({
  name: "multi-dialog",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<MultiDialogState>) => {
      state.push(action.payload);
    },
    setClose: (state) => {
      state.pop();
    },
  },
});

export const { setOpen, setClose } = multiDialogSlice.actions;
export const multiDialogSelector = (state: RootState) => state.multiDialog;

export default multiDialogSlice.reducer;
