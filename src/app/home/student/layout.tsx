import { configChecker } from "@/lib/serverUtils";
import { LayoutComponent } from "@/types/components";
import React from "react";

const Layout: LayoutComponent = async ({ children }) => {
  await configChecker();
  return <>{children}</>;
};

export default Layout;
