"use client";

import {
  DeleteButton,
  EditButton,
} from "@/components/buttons/TableActionButton";
import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import Typography from "@mui/material/Typography";
import { useRef } from "react";

const SchoolTable = () => {
  const tableRef = useRef<DynamicTableHandles>(null);
  return (
    <DynamicTable
      ref={tableRef}
      endpoint="school"
      buttons={{
        addButtonLink: "/home/school/add",
      }}
      columns={[
        {
          field: "NPSN",
        },
        {
          field: "type",
          headerName: "Jenjang",
        },
        {
          field: "name",
          headerName: "Nama sekolah",
          minWidth: 200,
        },
        {
          field: "address",
          headerName: "Alamat sekolah",
          flex: 1,
          minWidth: 300,
        },
        {
          field: "id",
          headerName: "Aksi",
          renderCell: (params) => (
            <>
              <EditButton href={`/home/school/edit/${params.value}`} />
              <DeleteButton
                refreshTable={tableRef.current?.refreshTable}
                confirmationNote={
                  <Typography>
                    Data tidak akan terhapus jika ada data siswa yang
                    bersangkutan dengan data sekolah.
                  </Typography>
                }
                confirmationTitle="Hapus sekolah"
                id={params.value}
                table="school"
              />
            </>
          ),
        },
      ]}
    />
  );
};

export default SchoolTable;
