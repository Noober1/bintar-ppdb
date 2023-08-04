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
import CampaignIcon from "@mui/icons-material/Campaign";

import { ROLES } from "@/constants/roles";

type Items =
  | {
      isDivider?: false;
      role: ROLES | boolean;
      external?: boolean;
      disabled?: boolean;
      title: string;
      path?: string;
      icon?: React.ReactNode;
    }
  | {
      isDivider: true;
      title: string;
    };

const items: Items[] = [
  {
    title: "Beranda",
    role: true,
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
    role: "user",
    title: "Pengguna",
    path: "/home/user",
    icon: (
      <SvgIcon fontSize="small">
        <SupervisorAccountIcon />
      </SvgIcon>
    ),
  },
  {
    role: "major",
    title: "Jurusan",
    path: "/home/major",
    icon: (
      <SvgIcon fontSize="small">
        <AltRouteIcon />
      </SvgIcon>
    ),
  },
  {
    role: "school",
    title: "Sekolah",
    path: "/home/school",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalanceIcon />
      </SvgIcon>
    ),
  },
  {
    role: "config",
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
    role: "basic",
    title: "Identitas siswa",
    path: "/home/student",
    icon: (
      <SvgIcon fontSize="small">
        <SchoolIcon />
      </SvgIcon>
    ),
  },
  {
    role: "administration",
    title: "Administrasi",
    path: "/home/administration",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalanceWalletIcon />
      </SvgIcon>
    ),
  },
  {
    role: "files",
    title: "Kelengkapan berkas",
    path: "/home/files",
    icon: (
      <SvgIcon fontSize="small">
        <FolderCopyIcon />
      </SvgIcon>
    ),
  },
  {
    role: "kesiswaan",
    title: "Kesiswaan",
    path: "/home/kesiswaan",
    icon: (
      <SvgIcon fontSize="small">
        <EditNoteIcon />
      </SvgIcon>
    ),
  },
  {
    role: "uniform",
    title: "Pengukuran pakaian",
    path: "/home/measure",
    icon: (
      <SvgIcon fontSize="small">
        <StraightenIcon />
      </SvgIcon>
    ),
  },
  {
    role: "bio",
    title: "Biodata",
    path: "/home/bio",
    icon: (
      <SvgIcon fontSize="small">
        <AccountCircleIcon />
      </SvgIcon>
    ),
  },
  {
    isDivider: true,
    title: "Lainnya",
  },
  {
    role: "announcement",
    title: "Pengumuman",
    icon: <CampaignIcon />,
    path: "/home/announcement",
  },
];

if (process.env.NODE_ENV === "development") {
  items.push({
    role: false,
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
