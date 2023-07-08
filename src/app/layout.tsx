"use client";
import "./globals.css";
import { Metadata } from "next";
import ReduxProvider from "@/providers/reduxProvider";
import { ThemeProvider } from "@/providers/themeProvider";
import QueryProvider from "@/providers/reactQueryProvider";
import MultiLayerDialog from "@/components/surfaces/dialogs/MultiLayerDialog";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import LocalizationProvider from "@/providers/LocalizationProvider";

export const metadata: Metadata = {
  title: "PSB SMK Bina Taruna Jalancagak",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <ReduxProvider>
          <SessionProvider>
            <QueryProvider>
              <ThemeProvider>
                <LocalizationProvider>
                  <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{
                      horizontal: "center",
                      vertical: "top",
                    }}
                  >
                    {children}
                    <MultiLayerDialog />
                  </SnackbarProvider>
                </LocalizationProvider>
              </ThemeProvider>
            </QueryProvider>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
