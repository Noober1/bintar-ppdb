import React from "react";
import UserTable from "./UserTable";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";

const Page = () => {
  return (
    <DashboardContentLayout title="Daftar pengguna">
      <UserTable />
    </DashboardContentLayout>
  );
};

export default Page;
