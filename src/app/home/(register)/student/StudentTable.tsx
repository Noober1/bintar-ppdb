"use client";

import DownloadButton from "@/components/buttons/DownloadButton";
import { EditButton } from "@/components/buttons/TableActionButton";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef } from "react";

const SchoolTable = () => {
  const tableRef = useRef<DynamicTableHandles>(null);

  return (
    <DynamicTable
      ref={tableRef}
      endpoint="basic"
      buttons={{
        customButton: (
          <DownloadButton
            title="Unduh rekapan"
            content="Click untuk mengunduh rekapan siswa"
            href="/api/exports/spreadsheet/student"
          >
            Unduh
          </DownloadButton>
        ),
        addButtonLink: "/home/student/add",
        deleteButton: "basic",
        deleteConfirmationNote: (
          <Alert severity="info">
            Status siswa yang aktif ataupun yang sudah mempunyai data
            administrasi tidak akan terhapus.
          </Alert>
        ),
      }}
      columns={[
        {
          field: "registrationNumber",
          headerName: "No. Registrasi",
          minWidth: 150,
        },
        {
          field: "firstName",
          headerName: "Nama lengkap",
          flex: 1,
          renderCell: (params) => (
            <Typography textTransform="capitalize" variant="body2">
              {params.value + " " + params.row.lastName}
            </Typography>
          ),
        },
        {
          field: "formerSchool",
          headerName: "Asal sekolah",
          minWidth: 200,
        },
        {
          field: "isRegistered",
          headerName: "Status registrasi",
          minWidth: 170,
          renderCell: (params) => (
            <Tooltip
              title={
                <TooltipTitle
                  title="Status registrasi"
                  content="Status registrasi siswa"
                />
              }
            >
              <Button
                variant="contained"
                color={params.value ? "success" : "error"}
                fullWidth
              >
                {params.value ? "Terdaftar" : "Belum terdaftar"}
              </Button>
            </Tooltip>
          ),
        },
        {
          field: "id",
          headerName: "Aksi",
          renderCell: (params) => (
            <>
              <EditButton href={`/home/student/edit/${params.value}`} />
            </>
          ),
        },
      ]}
    />
  );
};

export default SchoolTable;
