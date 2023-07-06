export const ROLES = [
  "user",
  "major",
  "school",
  "config",
  "basic",
  "administration",
  "files",
  "kesiswaan",
  "uniform",
  "bio",
] as const;

export type ROLES = (typeof ROLES)[number];

export type RolesStructure = {
  name: ROLES;
  label: string;
};

export const rolesStructure: RolesStructure[] = [
  { name: "user", label: "Pengguna" },
  { name: "major", label: "Jurusan" },
  { name: "school", label: "Sekolah" },
  { name: "config", label: "Daftar PPDB" },
  { name: "basic", label: "Siswa" },
  { name: "administration", label: "Administrasi" },
  { name: "files", label: "Berkas" },
  { name: "kesiswaan", label: "Kesiswaan" },
  { name: "uniform", label: "Pengukuran" },
  { name: "bio", label: "Biodata" },
];
