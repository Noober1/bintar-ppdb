"use client";

import DownloadButton from "@/components/buttons/DownloadButton";
import { EditButton } from "@/components/buttons/TableActionButton";
import DynamicTable from "@/components/layouts/Table";
import React from "react";

const KesiswaanTable = () => {
  return (
    <DynamicTable
      endpoint="kesiswaan"
      buttons={{
        customButton: (
          <DownloadButton
            title="Unduh rekapan"
            content="Click untuk mengunduh rekapan kesiswaan"
            href="/api/exports/spreadsheet/kesiswaan"
          >
            Unduh
          </DownloadButton>
        ),
      }}
      columns={[
        {
          field: "registrationNumber",
          headerName: "No. Registrasi",
          minWidth: 160,
        },
        {
          field: "fullName",
          headerName: "Nama siswa",
          valueGetter: (params) =>
            params.row.firstName + " " + params.row.lastName,
          minWidth: 200,
        },
        {
          field: "formerSchool",
          headerName: "Asal sekolah",
          minWidth: 180,
        },
        {
          field: "historyEdited",
          headerName: "Telah disunting?",
          minWidth: 140,
          type: "boolean",
        },
        {
          field: "actions",
          headerName: "Aksi",
          type: "actions",
          renderCell: (params) => (
            <EditButton href={`/home/kesiswaan/edit/${params.id}`} />
          ),
        },
      ]}
    />
  );
};

export default KesiswaanTable;
