import React from "react";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Login aplikasi PPDB",
};

const Page = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/home");
  }

  return <LoginPage />;
};

export default Page;
