import ErrorBox from "@/components/layouts/ErrorBox";
import { getCurrentConfig } from "@/lib/serverUtils";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const getConfig = await getCurrentConfig();
  return getConfig ? (
    <>{children}</>
  ) : (
    <ErrorBox message="Konfigurasi tidak ditemukan. Silahkan hubungi administrator untuk menambah konfigurasi." />
  );
};

export default Layout;
