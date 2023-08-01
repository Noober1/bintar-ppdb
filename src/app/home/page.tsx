import React from "react";
import DashboardPage from "./DashboardPage";
import { getSessionUserOrRedirect } from "@/lib/session";
import getUserData from "@/lib/getUserData";

const Page = async () => {
  const session = await getSessionUserOrRedirect();

  const userdata = await getUserData(session.id);
  return <DashboardPage userData={userdata} />;
};

export default Page;
