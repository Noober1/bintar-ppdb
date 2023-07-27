"use client";
import {
  DeleteButton,
  EditButton,
} from "@/components/buttons/TableActionButton";
import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import IconButton from "@mui/material/IconButton";
import React, { useRef } from "react";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";

export const dynamic = "force-dynamic";
export const revalidate = 10;

const AdministrationDetailTable = ({ userId }: { userId: string }) => {
  const tableRef = useRef<DynamicTableHandles>(null);
  return (
    <DynamicTable
      ref={tableRef}
      buttons={{
        addButtonLink: "/home/administration/add/" + userId,
      }}
      endpoint="administration"
      additionalQuery={{ userid: userId }}
      columns={[
        {
          field: "id",
          headerName: "No. Pembayaran",
          flex: 1,
        },
        {
          field: "dateCreated",
          headerName: "Tanggal dibuat",
          minWidth: 200,
          valueFormatter: (params) => {
            const date = new Date(params.value);
            return date.toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
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
          minWidth: 150,
          valueFormatter: (params) =>
            params.value.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            }),
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Aksi",
          minWidth: 150,
          renderCell: (params) => (
            <>
              <EditButton href={"/home/administration/edit/" + params.id} />
              <Tooltip
                title={
                  <TooltipTitle
                    title="Cetak pembayaran"
                    content="Click untuk mencetak pembayaran"
                  />
                }
              >
                <IconButton
                  color="success"
                  LinkComponent="a"
                  href={`/api/print/${params.id}`}
                  target="_blank"
                >
                  <LocalPrintshopIcon />
                </IconButton>
              </Tooltip>
              <DeleteButton
                confirmationTitle="Hapus pembayaran?"
                id={params.id}
                table="administration"
                refreshTable={tableRef.current?.refreshTable}
              />
            </>
          ),
        },
      ]}
    />
  );
};

export default AdministrationDetailTable;
