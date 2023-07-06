"use client";

import DynamicTable from "@/components/layouts/Table";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import { EditButton } from "@/components/buttons/TableActionButton";

const ConfigurationTable = () => {
  return (
    <DynamicTable
      endpoint="configuration"
      pageSize={10}
      columns={[
        {
          field: "year",
          headerName: "Tahun",
        },
        {
          field: "registrationFormat",
          minWidth: 200,
          headerName: "Format No. Pendaftaran",
        },
        {
          field: "isActive",
          headerName: "Status",
          renderCell: (params) => (
            <Chip
              variant="outlined"
              color={params.value ? "success" : "error"}
              label={params.value ? "Aktif" : "Nonaktif"}
            />
          ),
        },
        {
          field: "id",
          headerName: "Aksi",
          renderCell: (params) => (
            <EditButton href={`configuration/edit/${params.value}`} />
          ),
        },
      ]}
    />
  );
};

export default ConfigurationTable;
