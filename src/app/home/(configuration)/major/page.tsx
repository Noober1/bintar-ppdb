import React from "react";
import MajorTable from "./MajorTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = () => {
  return (
    <DashboardContentLayout title="Daftar jurusan">
      <MajorTable />
    </DashboardContentLayout>
  );
};

export default Page;
