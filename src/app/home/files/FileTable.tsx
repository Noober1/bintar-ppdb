"use client";
import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import { CheckFields } from "@/lib/formSchemas";
import { Checkbox } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";

interface DisabledFields {
  field: keyof CheckFields;
  id: number;
}

const FileTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [disabledFields, setdisabledFields] = useState<DisabledFields[]>([]);
  const tableRef = useRef<DynamicTableHandles>(null);
  const handleChangeCheckBox = (id: any, value: boolean, field: string) => {
    setdisabledFields((prev) => [
      ...prev,
      {
        field: field as keyof CheckFields,
        id: id,
      },
    ]);
    axios
      .put("/crud/files/", {
        id,
        value,
        field,
      })
      .then((response) => {
        enqueueSnackbar("Data berhasil diubah", { variant: "success" });
        tableRef.current?.refreshTable();
      })
      .catch(() => {
        enqueueSnackbar("Data gagal diubah", { variant: "error" });
      })
      .finally(() => {
        setdisabledFields((prev) =>
          prev.filter((value) => value.field !== field && value.id !== id)
        );
      });
  };

  const checkBox: GridColDef["renderCell"] = (params) => {
    return (
      <Checkbox
        disabled={Boolean(
          disabledFields.filter(
            (value) => value.field == params.field && value.id == params.id
          ).length
        )}
        color={params.value ? "success" : "default"}
        onChange={(event, checked) =>
          handleChangeCheckBox(params.id as number, checked, params.field)
        }
        checked={params.value}
      />
    );
  };
  return (
    <DynamicTable
      ref={tableRef}
      endpoint="files"
      columns={[
        {
          field: "registrationNumber",
          headerName: "No. Pendaftaran",
          minWidth: 160,
        },
        {
          field: "fullName",
          headerName: "Nama lengkap",
          minWidth: 200,
          valueGetter: (params) =>
            params.row.firstName + " " + params.row.lastName,
          type: "string",
        },
        {
          field: "fileNISN",
          headerName: "NISN",
          renderCell: checkBox,
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileKIPKPS",
          headerName: "KIP/KPS",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileKTP",
          headerName: "KTP",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileMCU",
          headerName: "MCU",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileIjazah",
          headerName: "Ijazah",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileSKHUN",
          headerName: "SKHUN",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileSTK",
          headerName: "STK",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileAkta",
          headerName: "Akta",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileKK",
          headerName: "KK",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileRaport",
          headerName: "RPT",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "fileSKB",
          headerName: "SKB",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "filePhoto23",
          headerName: "2X3",
        },
        {
          renderCell: checkBox,
          type: "boolean",
          field: "filePhoto34",
          headerName: "3X4",
        },
      ]}
    />
  );
};

export default FileTable;
