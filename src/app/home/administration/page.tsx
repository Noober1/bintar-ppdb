import React from "react";
import AdministrationTable from "./AdministrationTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = () => {
  return (
    <DashboardContentLayout title="Administrasi">
      <AdministrationTable />
    </DashboardContentLayout>
  );
};

export default Page;
