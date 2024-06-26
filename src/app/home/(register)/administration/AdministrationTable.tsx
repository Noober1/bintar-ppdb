"use client";

import DownloadButton from "@/components/buttons/DownloadButton";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import DynamicTable, { DynamicTableHandles } from "@/components/layouts/Table";
import { setClose, setOpen } from "@/lib/redux/multiDialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

const AdministrationTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const tableRef = useRef<DynamicTableHandles>(null);
  const handleSetRegister = (id: number) => {
    dispatch(
      setOpen({
        title: "Ubah status registrasi",
        content: "Apa anda yakin?",
        confirmButton: "Ubah",
        rejectButton: "Batal",
        confirmCallback: () => {
          dispatch(setClose());
          dispatch(
            setOpen({
              type: "loading",
            })
          );
          axios
            .put("/crud/student/set-register/" + id)
            .then(() => {
              tableRef.current?.refreshTable();
              enqueueSnackbar("Status siswa telah berhasil diperbarui", {
                variant: "success",
              });
            })
            .catch(() => {
              enqueueSnackbar("Status siswa gagal diperbarui", {
                variant: "error",
              });
            })
            .finally(() => {
              dispatch(setClose());
            });
        },
      })
    );
  };
  return (
    <DynamicTable
      ref={tableRef}
      endpoint="basic"
      enableSearch
      buttons={{
        customButton: (
          <DownloadButton
            title="Unduh rekapan"
            content="Click untuk mengunduh rekapan pembayaran"
            href="/api/exports/spreadsheet/administration"
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
          field: "firstName",
          headerName: "Nama lengkap",
          minWidth: 280,
          renderCell: (params) => (
            <Typography>
              {params.value} {params.row.lastName}
            </Typography>
          ),
        },
        {
          field: "formerSchool",
          headerName: "Asal sekolah",
          minWidth: 200,
        },
        {
          field: "isRegistered",
          headerName: "Status registrasi",
          align: "center",
          headerAlign: "center",
          minWidth: 180,
          renderCell: (params) => {
            return (
              <Tooltip
                title={
                  <TooltipTitle
                    title="Status registrasi"
                    content="Siswa tidak dapat melanjutkan ke tahap berikutnya jika status masih belum teregistrasi. Click tombol ini untul merubah status registrasi."
                  />
                }
              >
                <Button
                  fullWidth
                  onClick={() => handleSetRegister(params.row.id)}
                  variant="contained"
                  color={params.value ? "success" : "error"}
                >
                  {params.value ? "Terdaftar" : "Belum terdaftar"}
                </Button>
              </Tooltip>
            );
          },
        },
        {
          field: "id",
          headerName: "Aksi",
          align: "center",
          headerAlign: "center",
          minWidth: 150,
          renderCell: (params) => (
            <Button
              LinkComponent={Link}
              href={`/home/administration/` + params.value}
              variant="contained"
              color="primary"
            >
              Pembayaran
            </Button>
          ),
        },
      ]}
    />
  );
};

export default AdministrationTable;
