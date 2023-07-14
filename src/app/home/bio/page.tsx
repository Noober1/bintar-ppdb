import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import React from "react";
import BioTable from "./BioTable";

const Page = () => {
  return (
    <DashboardContentLayout title="Biodata lengkap">
      <BioTable />
    </DashboardContentLayout>
  );
};

export default Page;
