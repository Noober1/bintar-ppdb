import { configChecker } from "@/lib/serverUtils";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await configChecker();
  return <>{children}</>;
};

export default Layout;
