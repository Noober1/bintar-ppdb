import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import React from "react";
import KesiswaanTable from "./KesiswaanTable";

const Page = () => {
  return (
    <DashboardContentLayout title="Kesiswaan">
      <KesiswaanTable />
    </DashboardContentLayout>
  );
};

export default Page;
