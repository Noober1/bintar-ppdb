import React from "react";
import StudentTable from "./StudentTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = async () => {
  return (
    <DashboardContentLayout title="Daftar siswa">
      <StudentTable />
    </DashboardContentLayout>
  );
};

export default Page;
