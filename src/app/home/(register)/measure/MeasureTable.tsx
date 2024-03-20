"use client";

import DownloadButton from "@/components/buttons/DownloadButton";
import { EditButton } from "@/components/buttons/TableActionButton";
import DynamicTable from "@/components/layouts/Table";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

const columns: GridColDef[] = [
  {
    field: "registrationNumber",
    headerName: "No. Pendaftaran",
    type: "string",
    minWidth: 160,
  },
  {
    field: "fullName",
    headerName: "Nama lengkap",
    valueGetter: (params) => params.row.firstName + " " + params.row.lastName,
    minWidth: 200,
  },
  {
    field: "formerSchool",
    headerName: "Asal sekolah",
    minWidth: 200,
  },
  {
    field: "measureEdited",
    headerName: "Telah disunting?",
    type: "boolean",
    minWidth: 160,
  },
  {
    field: "actions",
    headerName: "Aksi",
    type: "actions",
    renderCell: (params) => (
      <EditButton href={`/home/measure/edit/${params.id}`} />
    ),
  },
];

const MeasureTable = () => {
  return (
    <DynamicTable
      endpoint="measure"
      buttons={{
        customButton: (
          <DownloadButton
            title="Unduh rekapan"
            content="Click untuk mengunduh rekapan ukuran seragam"
            href="/api/exports/spreadsheet/uniform"
          >
            Unduh
          </DownloadButton>
        ),
      }}
      columns={columns}
    />
  );
};

export default MeasureTable;
