import { configChecker } from "@/lib/serverUtils";
import React from "react";
import StudentTable from "./StudentTable";

export const revalidate = 5;

const Page = async () => {
  return <StudentTable />;
};

export default Page;
