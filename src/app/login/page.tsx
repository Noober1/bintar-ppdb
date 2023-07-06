import React from "react";
import LoginBox from "@/components/forms/LoginBox";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login aplikasi PPDB",
};

const LoginPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-md w-full">
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginPage;
