"use client";

import React from "react";
import Callout from "@/components/display/Callout";
import getUserData from "@/lib/getUserData";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import EditNoteIcon from "@mui/icons-material/EditNote";
import StraightenIcon from "@mui/icons-material/Straighten";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useQuery } from "@tanstack/react-query";
import { dataFetcher } from "@/lib/utils";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface DashboardDataResponse {
  basicData: {
    user: number;
    major: number;
    school: number;
    config: number;
  } | null;
  currentConfig: {
    year: number;
    student: number;
    registeredStudent: number;
    administration: number;
    administrationIncome: number;
    file: number;
    kesiswaan: number;
    measure: number;
    biodata: number;
  } | null;
}

const DashboardPage = ({
  userData,
}: {
  userData: Awaited<ReturnType<typeof getUserData>>;
}) => {
  const { isLoading, data } = useQuery<DashboardDataResponse>({
    queryKey: ["dashboard-statistic"],
    queryFn: () => dataFetcher("/api/dashboard"),
    keepPreviousData: true,
  });

  return (
    <Box>
      <Typography variant="h4" marginBottom={2}>
        {isLoading ? (
          <Skeleton height={60} className="w-3/4 md:w-1/2 lg:w-1/4" />
        ) : (
          `Halo, ${userData?.fullname}`
        )}
      </Typography>
      <Box
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
        marginBottom={4}
      >
        <Callout
          loading={isLoading}
          title="Pengguna"
          content={`${data?.basicData?.user} pengguna`}
          icon={<SupervisorAccountIcon />}
        />
        <Callout
          loading={isLoading}
          color="secondary"
          title="Jurusan"
          content={`${data?.basicData?.major} jurusan`}
          icon={<AltRouteIcon />}
        />
        <Callout
          loading={isLoading}
          color="warning"
          title="Sekolah"
          content={`${data?.basicData?.school} sekolah`}
          icon={<AccountBalanceIcon />}
        />
        <Callout
          loading={isLoading}
          color="info"
          title="PPDB"
          content={`${data?.basicData?.config} daftar PPDB`}
          icon={<SettingsSuggestIcon />}
        />
      </Box>
      {isLoading ? (
        <Typography variant="h3" gutterBottom>
          <Skeleton />
        </Typography>
      ) : (
        <>
          {data?.currentConfig ? (
            <Typography variant="h4" gutterBottom>
              Rincian PPDB tahun {data.currentConfig.year}
            </Typography>
          ) : (
            <Alert severity="error">
              <AlertTitle>Tidak ada konfigurasi</AlertTitle>Tidak ada
              konfigurasi PPDB yang aktif.
            </Alert>
          )}
        </>
      )}
      <Box
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
        marginBottom={4}
      >
        <Callout
          loading={isLoading}
          icon={<SchoolIcon />}
          title="Siswa terdaftar"
          content={`${data?.currentConfig?.student || 0} siswa`}
        />
        <Callout
          loading={isLoading}
          icon={<AccountBalanceWalletIcon />}
          color="secondary"
          title="Siswa teregistrasi"
          content={`${data?.currentConfig?.registeredStudent || 0} siswa`}
        />
        <Callout
          loading={isLoading}
          icon={<AccountBalanceWalletIcon />}
          color="success"
          title="Pembayaran"
          content={`${
            data?.currentConfig?.administration || 0
          } data pembayaran`}
        />
        <Callout
          loading={isLoading}
          icon={<AccountBalanceWalletIcon />}
          color="success"
          title="Total pembayaran"
          content={(
            data?.currentConfig?.administrationIncome || 0
          ).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        />
        <Callout
          loading={isLoading}
          icon={<FolderCopyIcon />}
          color="error"
          title="Berkas siswa"
          content={`${data?.currentConfig?.file || 0} telah diperiksa`}
        />
        <Callout
          loading={isLoading}
          icon={<EditNoteIcon />}
          color="info"
          title="Kesiswaan"
          content={`${data?.currentConfig?.kesiswaan || 0} telah diperiksa`}
        />
        <Callout
          loading={isLoading}
          icon={<StraightenIcon />}
          color="success"
          title="Pengukuran"
          content={`${data?.currentConfig?.measure || 0} telah diperiksa`}
        />
        <Callout
          loading={isLoading}
          icon={<AccountCircleIcon />}
          color="warning"
          title="Biodata lengkap"
          content={`${data?.currentConfig?.biodata || 0} data telah dientri`}
        />
      </Box>
    </Box>
  );
};

export default DashboardPage;
