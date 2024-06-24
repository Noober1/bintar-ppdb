"use client";
import { EditButton } from "@/components/buttons/TableActionButton";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import DynamicTable from "@/components/layouts/Table";
import { rolesStructure } from "@/constants/roles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React from "react";

const UserTable = () => {
  return (
    <DynamicTable
      enableSearch
      endpoint="user"
      buttons={{
        addButtonLink: "/home/user/add",
        deleteButton: "user",
      }}
      columns={[
        {
          field: "email",
          headerName: "Email",
          minWidth: 300,
        },
        {
          field: "fullname",
          headerName: "Nama lengkap",
          minWidth: 300,
        },
        {
          field: "grantedAccess",
          headerName: "Hak akses",
          flex: 1,
          renderCell: (params) => {
            let renderAccess = <div>Error</div>;
            try {
              const parseAccess = JSON.parse(params.value);
              const filterList = rolesStructure.filter((value) =>
                parseAccess.includes(value.name)
              );
              renderAccess = (
                <>
                  {filterList.map((value) => (
                    <Chip
                      size="small"
                      color="primary"
                      label={value.label}
                      key={value.name}
                    />
                  ))}
                </>
              );
            } catch (error) {}
            return (
              <Tooltip
                title={
                  <TooltipTitle
                    title="Hak akses"
                    content="Daftar kategori yang dapat diakses pengguna."
                  />
                }
              >
                <Stack direction="row" spacing={1}>
                  {renderAccess}
                </Stack>
              </Tooltip>
            );
          },
        },
        {
          field: "action",
          type: "actions",
          headerName: "Aksi",
          renderCell: (param) => (
            <EditButton href={`/home/user/edit/${param.id}`} />
          ),
        },
      ]}
    />
  );
};

export default UserTable;
