import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
