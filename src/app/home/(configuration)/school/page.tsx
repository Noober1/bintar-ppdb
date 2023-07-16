import React from "react";
import SchoolTable from "./SchoolTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = () => {
  return (
    <DashboardContentLayout title="Daftar asal sekolah">
      <SchoolTable />
    </DashboardContentLayout>
  );
};

export default Page;
