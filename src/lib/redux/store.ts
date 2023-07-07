"use client";

import { configureStore } from "@reduxjs/toolkit";
import multiDialogReducer from "./multiDialog";
import configurationReducer from "./config";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    multiDialog: multiDialogReducer,
    configuration: configurationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
