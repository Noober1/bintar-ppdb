"use client";
import SvgIcon from "@mui/material/SvgIcon";
import HomeIcon from "@mui/icons-material/Home";
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
import ScienceIcon from "@mui/icons-material/Science";

type Items = {
  isDivider?: boolean;
  external?: boolean;
  disabled?: boolean;
  title: string;
  path?: string;
  icon?: React.ReactNode;
};

const items: Items[] = [
  {
    title: "Beranda",
    path: "/home",
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    isDivider: true,
    title: "Pengaturan dasar",
  },
  {
    title: "Pengguna",
    path: "/home/user",
    icon: (
      <SvgIcon fontSize="small">
        <SupervisorAccountIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Jurusan",
    path: "/home/major",
    icon: (
      <SvgIcon fontSize="small">
        <AltRouteIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Sekolah",
    path: "/home/school",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalanceIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Daftar PPDB",
    path: "/home/configuration",
    icon: (
      <SvgIcon fontSize="small">
        <SettingsSuggestIcon />
      </SvgIcon>
    ),
  },
  {
    isDivider: true,
    title: "Pendaftaran",
  },
  {
    title: "Identitas siswa",
    path: "/home/student",
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Administrasi",
    path: "/home/administration",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalanceWalletIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Kelengkapan berkas",
    path: "/home/files",
    icon: (
      <SvgIcon fontSize="small">
        <FolderCopyIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Kesiswaan",
    path: "/home/kesiswaan",
    icon: (
      <SvgIcon fontSize="small">
        <EditNoteIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Pengukuran pakaian",
    path: "/home/measure",
    icon: (
      <SvgIcon fontSize="small">
        <StraightenIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Biodata",
    path: "/home/bio",
    icon: (
      <SvgIcon fontSize="small">
        <AccountCircleIcon />
      </SvgIcon>
    ),
  },
];

if (process.env.NODE_ENV === "development") {
  items.push({
    isDivider: true,
    title: "Lainnya",
  });
  items.push({
    title: "Testpage",
    path: "/testpage",
    icon: (
      <SvgIcon fontSize="small">
        <ScienceIcon />
      </SvgIcon>
    ),
  });
}

export default items;
