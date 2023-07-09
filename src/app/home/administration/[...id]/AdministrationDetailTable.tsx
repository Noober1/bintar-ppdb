"use client";
import DynamicTable from "@/components/layouts/Table";
import React from "react";

const AdministrationDetailTable = ({ userId }: { userId: string }) => {
  return (
    <DynamicTable
      buttons={{
        addButtonLink: "/home/administration/add/" + userId,
      }}
      endpoint="administration"
      additionalQuery={{ userid: userId }}
      columns={[
        {
          field: "dateCreated",
          headerName: "Tanggal dibuat",
          minWidth: 180,
          valueFormatter: (params) => {
            const date = new Date(params.value);
            return date.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          },
        },
        {
          field: "description",
          headerName: "Perihal",
          flex: 1,
        },
        {
          field: "payer",
          headerName: "Pembayar",
          minWidth: 200,
        },
        {
          field: "nominal",
          headerName: "Nominal",
          minWidth: 200,
          valueFormatter: (params) =>
            params.value.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
        },
        {
          field: "id",
          headerName: "Aksi",
        },
      ]}
    />
  );
};

export default AdministrationDetailTable;
