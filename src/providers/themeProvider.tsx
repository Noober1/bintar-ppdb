"use client";

import { NextAppDirEmotionCacheProvider } from "@/providers/emotionCacheProvider";
import Provider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "@/lib/theme";
import { useSelector } from "react-redux";
import { configurationSelector } from "@/lib/redux/config";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useSelector(configurationSelector);
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <Provider theme={theme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
