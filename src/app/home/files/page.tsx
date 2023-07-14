import React from "react";
import FileTable from "./FileTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = () => {
  return (
    <DashboardContentLayout title="Daftar kelengkapan berkas">
      <FileTable />
    </DashboardContentLayout>
  );
};

export default Page;
