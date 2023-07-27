"use client";

import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import Chip from "@mui/material/Chip";
import {
  DeleteButton,
  DownloadButton,
} from "@/components/buttons/TableActionButton";
import Typography from "@mui/material/Typography";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setClose, setOpen } from "@/lib/redux/multiDialog";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useSnackbar } from "notistack";

const ConfigurationTable = () => {
  const tableRef = useRef<DynamicTableHandles>(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSetActive = (id: number) => [
    dispatch(
      setOpen({
        title: "Ubah status konfigurasi?",
        content: (
          <>
            <Typography gutterBottom>
              Apakah yakin ingin mengubah status konfigurasi?
            </Typography>
            <Alert severity="error">
              Mengaktifkan konfigurasi ini akan menonaktifkan konfigurasi yang
              saat ini aktif. Pastikan tidak ada proses pendaftaran yang masih
              berlangsung.
            </Alert>
          </>
        ),
        confirmButton: "Ubah",
        rejectButton: "Batalkan",
        confirmCallback: () => {
          dispatch(setClose());
          dispatch(
            setOpen({
              type: "loading",
            })
          );
          axios
            .get("/crud/configuration/" + id)
            .then(() => {
              enqueueSnackbar("Status berhasil dirubah", {
                variant: "success",
              });
              tableRef.current?.refreshTable();
            })
            .catch(() => {
              enqueueSnackbar("Status gagal dirubah", { variant: "error" });
            })
            .finally(() => {
              dispatch(setClose());
            });
        },
      })
    ),
  ];

  return (
    <DynamicTable
      ref={tableRef}
      buttons={{
        addButtonLink: "/home/configuration/add",
      }}
      endpoint="configuration"
      columns={[
        {
          field: "year",
          headerName: "Tahun",
          minWidth: 160,
        },
        {
          field: "registrationFormat",
          minWidth: 240,
          headerName: "Format No. Pendaftaran",
          renderCell: (params) => {
            const splitFormat = params.value.split(/(\[.\])/);
            const tooltipContent: string[] = splitFormat.map((value: string) =>
              value === "[Y]"
                ? new Date().getFullYear()
                : value === "[I]"
                ? "4"
                : value === "[N]"
                ? "3214"
                : value
            );
            return (
              <Tooltip
                title={
                  <TooltipTitle
                    title="Format No. Pendaftaran"
                    content={`Hasil format akan menjadi seperti berikut: ${tooltipContent.join(
                      ""
                    )}`}
                  />
                }
              >
                <div className="flex">
                  {splitFormat.map((value: string, index: number) => (
                    <Typography
                      color={
                        value === "[Y]"
                          ? "red"
                          : value === "[I]"
                          ? "blue"
                          : value === "[N]"
                          ? "green"
                          : undefined
                      }
                      key={index}
                    >
                      {value}
                    </Typography>
                  ))}
                </div>
              </Tooltip>
            );
          },
        },
        {
          field: "isActive",
          headerName: "Status",
          align: "center",
          headerAlign: "center",
          minWidth: 160,
          renderCell: (params) => (
            <Tooltip
              title={
                <TooltipTitle
                  title="Ubah status konfigurasi"
                  content="Click untuk mengubah status konfigurasi"
                />
              }
            >
              <Chip
                variant="filled"
                color={params.value ? "success" : "error"}
                label={params.value ? "Aktif" : "Nonaktif"}
                onClick={() => handleSetActive(params.row.id)}
              />
            </Tooltip>
          ),
        },
        {
          field: "id",
          headerName: "Aksi",
          flex: 1,
          renderCell: (params) => (
            <>
              <DownloadButton
                title="Unduh rekapan siswa"
                content="Click untuk mengunduh rekapan siswa berupa file excel"
                href={`/api/exports/spreadsheet/student`}
              />
              <DownloadButton
                title="Unduh rekapan administrasi"
                content="Click untuk mengunduh rekapan pembayaran berupa file excel"
                href={`/api/exports/spreadsheet/administration`}
              />
              <DeleteButton
                confirmationTitle="Hapus konfigurasi?"
                id={params.value}
                table="configuration"
                refreshTable={tableRef.current?.refreshTable}
                confirmationNote={
                  <Typography>
                    Data ini tidak akan terhapus jika ada siswa yang berkaitan
                    dengan konfigurasi ini
                  </Typography>
                }
              />
            </>
          ),
        },
      ]}
    />
  );
};

export default ConfigurationTable;
