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
  name?: string;
  isOpen?: boolean;
  title?: string;
  isLoading?: boolean;
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
      state.push({
        isOpen: true,
        ...action.payload,
      });
    },
    setClose: (state) => {
      state.pop();
    },
    setLoading: (
      state,
      action: PayloadAction<{ name: string; loading?: boolean }>
    ) => {
      if (state.length > 0) {
        const findDialogIndex = state.findIndex(
          (value) => value.name === action.payload.name
        );
        const isModalExist = typeof state[findDialogIndex] !== "undefined";
        if (isModalExist) {
          state[findDialogIndex].isLoading = action.payload.loading;
        }
      }
    },
  },
});

export const { setOpen, setClose, setLoading } = multiDialogSlice.actions;
export const multiDialogSelector = (state: RootState) => state.multiDialog;

export default multiDialogSlice.reducer;
