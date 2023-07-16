"use client";

import {
  DeleteButton,
  EditButton,
} from "@/components/buttons/TableActionButton";
import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import React, { useRef } from "react";

const MajorTable = () => {
  const tableRef = useRef<DynamicTableHandles>(null);
  return (
    <DynamicTable
      ref={tableRef}
      endpoint="major"
      buttons={{
        addButtonLink: "/home/major/add",
      }}
      columns={[
        {
          field: "initial",
          headerName: "Akronim",
        },
        {
          field: "name",
          headerName: "Nama jurusan",
          minWidth: 300,
        },
        {
          field: "id",
          headerName: "Aksi",
          renderCell: (params) => (
            <ButtonGroup>
              <EditButton href={"/home/major/edit/" + params.value} />
              <DeleteButton
                confirmationTitle="Hapus jurusan"
                confirmationNote={
                  <Typography>
                    Jurusan yang dipilih tidak akan terhapus jika ada data siswa
                    yang berkaitan dengan jurusan ini.
                  </Typography>
                }
                id={params.value}
                table="major"
                refreshTable={tableRef.current?.refreshTable}
              />
            </ButtonGroup>
          ),
        },
      ]}
    />
  );
};

export default MajorTable;
