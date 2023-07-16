import React from "react";
import DashboardPage from "./DashboardPage";
import getServerSession from "@/lib/getServerSession";
import getUserData from "@/lib/getUserData";

const Page = async () => {
  const session = await getServerSession();

  const userdata = await getUserData(session?.user.id);
  return <DashboardPage userData={userdata} />;
};

export default Page;
