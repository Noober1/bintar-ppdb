"use client";

import { EditButton } from "@/components/buttons/TableActionButton";
import DynamicTable from "@/components/layouts/Table";
import { localizeDate } from "@/lib/utils";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Tanggal dibuat",
    valueFormatter: ({ value }) =>
      typeof value === "string" ? localizeDate(new Date(value)) : value,
    minWidth: 150,
  },
  {
    field: "title",
    headerName: "Judul",
    flex: 1,
  },
  {
    field: "action",
    type: "actions",
    headerName: "Aksi",
    minWidth: 250,
    renderCell: (params) => (
      <EditButton href={`/home/announcement/edit/${params.id}`} />
    ),
  },
];

const AnnouncementTable = () => {
  return (
    <DynamicTable
      columns={columns}
      endpoint="announcement"
      buttons={{
        addButtonLink: "/home/announcement/add",
        deleteButton: "announcement",
      }}
    />
  );
};

export default AnnouncementTable;
