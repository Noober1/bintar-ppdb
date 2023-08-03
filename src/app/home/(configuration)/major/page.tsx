import React from "react";
import MajorTable from "./MajorTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import { withRoleOrRedirect } from "@/lib/session";

const Page = async () => {
  await withRoleOrRedirect("major");
  return (
    <DashboardContentLayout title="Daftar jurusan">
      <MajorTable />
    </DashboardContentLayout>
  );
};

export default Page;
