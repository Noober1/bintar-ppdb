import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getSessionUserOrRedirect } from "@/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await getSessionUserOrRedirect();

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardPageLayout;
