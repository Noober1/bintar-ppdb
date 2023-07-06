"use client";

import { NextAppDirEmotionCacheProvider } from "@/providers/emotionCacheProvider";
import Provider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <Provider theme={theme}>
        <CssBaseline />
        {children}
      </Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
