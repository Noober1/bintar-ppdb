import React from "react";
import ConfigurationTable from "./ConfigurationTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = () => {
  return (
    <DashboardContentLayout title="Daftar PPDB">
      <ConfigurationTable />
    </DashboardContentLayout>
  );
};

export default Page;
