"use client";

import { EditButton } from "@/components/buttons/TableActionButton";
import DynamicTable from "@/components/layouts/Table";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

const columns: GridColDef[] = [
  { field: "registrationNumber", headerName: "No. Pendaftaran", minWidth: 160 },
  {
    field: "fullName",
    headerName: "Nama lengkap",
    valueGetter: (params) => params.row.firstName + " " + params.row.lastName,
    minWidth: 200,
  },
  { field: "formerSchool", headerName: "Asal sekolah", minWidth: 200 },
  {
    field: "bioEdited",
    type: "boolean",
    headerName: "Telah disunting?",
    minWidth: 160,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Aksi",
    renderCell: (params) => <EditButton href={`/home/bio/edit/${params.id}`} />,
  },
];

const BioTable = () => {
  return <DynamicTable columns={columns} endpoint="bio" />;
};

export default BioTable;
