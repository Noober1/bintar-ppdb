"use client";

import {
  DeleteButton,
  EditButton,
} from "@/components/buttons/TableActionButton";
import DynamicTable from "@/components/layouts/Table";

const SchoolTable = () => {
  return (
    <DynamicTable
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
          minWidth: 300,
        },
        {
          field: "id",
          headerName: "Aksi",
          renderCell: (params) => (
            <>
              <EditButton href={`/home/school/edit/${params.value}`} />
              <DeleteButton
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
