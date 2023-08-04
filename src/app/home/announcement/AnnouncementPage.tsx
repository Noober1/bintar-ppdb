"use client";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import React from "react";
import AnnouncementTable from "./AnnouncementTable";

const AnnouncementPage = () => {
  return (
    <DashboardContentLayout title="Daftar pengumuman">
      <AnnouncementTable />
    </DashboardContentLayout>
  );
};

export default AnnouncementPage;
