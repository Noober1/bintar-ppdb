import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import React from "react";
import SettingPage from "./SettingPage";

const Page = async () => {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  return <SettingPage />;
};

export default Page;
