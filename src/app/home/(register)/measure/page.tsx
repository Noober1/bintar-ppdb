import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import React from "react";
import MeasureTable from "./MeasureTable";

const Page = () => {
  return (
    <DashboardContentLayout title="Pengukuran">
      <MeasureTable />
    </DashboardContentLayout>
  );
};

export default Page;
