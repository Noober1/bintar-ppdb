import { withRoleOrRedirect } from "@/lib/session";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await withRoleOrRedirect("bio");
  return <>{children}</>;
};

export default Layout;
