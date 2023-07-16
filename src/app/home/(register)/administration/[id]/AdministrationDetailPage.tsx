"use client";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import React from "react";
import { StudentData } from "./page";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AdministrationDetailTable from "./AdministrationDetailTable";

interface AdministrationDetailPageProps {
  data: StudentData;
}

const AdministrationDetailPage = ({ data }: AdministrationDetailPageProps) => {
  const firstNameInitial = data.firstName?.split("")[0] || "";
  const lastNameInitial = data.lastName?.split("")[0] || "";
  const initialName = (firstNameInitial + lastNameInitial).toUpperCase();
  return (
    <DashboardContentLayout
      title="Detail pembayaran"
      backButtonUrl="/home/administration"
    >
      <Box component={Paper} className="flex p-4 gap-4 mb-4">
        <Box
          className="h-32 aspect-square rounded-full flex items-center justify-center"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            {initialName}
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <Stack>
            <Typography variant="h6" gutterBottom>
              {data.registrationNumber}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
            >{`${data.firstName} ${data.lastName}`}</Typography>
            <Typography variant="h5">{data.formerSchool?.name}</Typography>
          </Stack>
        </Box>
        <Box className="flex gap-2">
          <Typography>Status registrasi:</Typography>
          <Typography color={data.isRegistered ? "green" : "red"}>
            {data.isRegistered ? "Teregistrasi" : "Belum teregistrasi"}
          </Typography>
        </Box>
      </Box>
      <AdministrationDetailTable userId={data.id.toString()} />
    </DashboardContentLayout>
  );
};

export default AdministrationDetailPage;
