"use client";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import React from "react";
import AnnouncementTable from "./AnnouncementTable";
import { Alert, AlertTitle } from "@mui/material";

const AnnouncementPage = () => {
  return (
    <DashboardContentLayout title="Daftar pengumuman">
      <Alert className="mb-2" color="info">
        <AlertTitle>Informasi</AlertTitle>
        Pengumuman yang telah ditambahkan akan tampil pada halaman pengumuman
        pada situs PSB Online
      </Alert>
      <AnnouncementTable />
    </DashboardContentLayout>
  );
};

export default AnnouncementPage;
