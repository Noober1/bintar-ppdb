import React from "react";
import { getSessionUser } from "@/lib/session";
import { Metadata } from "next";
import LoginPage from "./LoginPage";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login aplikasi PPDB",
};

const Page = async () => {
  const isSessionExist = await getSessionUser();
  if (isSessionExist) return redirect("/home");
  return <LoginPage />;
};

export default Page;
