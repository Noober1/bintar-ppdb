import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { redirect } from "next/navigation";
import getUserData from "@/lib/getUserData";
import getServerSession from "@/lib/getServerSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // server-side auth check
  const session = await getServerSession();
  if (!session) {
    return redirect("/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardPageLayout;
