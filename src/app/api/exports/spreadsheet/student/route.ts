import { CrudRequestHandler } from "@/types/route";
import { getCurrentConfig } from "@/lib/serverUtils";
import { prisma } from "@/lib/prisma";
import ExcelMaker from "@/lib/tableMaker";
import { RouteExceptionError } from "@/lib/routeUtils";

export const GET: CrudRequestHandler = async () => {
  const currentConfig = await getCurrentConfig();
  if (!currentConfig)
    throw new RouteExceptionError("No active configuration", 404);

  const getStudent = await prisma.student.findMany({
    where: {
      configId: currentConfig.id,
    },
    include: {
      formerSchool: {
        select: {
          name: true,
        },
      },
      major: {
        select: {
          name: true,
        },
      },
    },
  });
  if (getStudent.length < 1)
    throw new RouteExceptionError("No student found", 404);

  const mappedData = getStudent.map((value, index) => ({
    number: index + 1,
    dateCreated: value.createdAt || new Date(),
    registrationNumber: value.registrationNumber || "",
    fullName: value.firstName + " " + value.lastName,
    gender: value.gender === "MALE" ? "Laki-laki" : "Perempuan",
    formerSchool: value.formerSchool?.name || "",
    major: value.major?.name || "",
    address: value.address || "",
    phoneNumber: value.phoneNumber || "",
    parentPhoneNumber: value.parentPhoneNumber || "",
  }));

  const table = new ExcelMaker({
    headers: [
      { field: "number", label: "No", width: 5 },
      { field: "dateCreated", label: "Tanggal dibuat", width: 20 },
      { field: "registrationNumber", label: "No. Pendaftaran", width: 25 },
      { field: "fullName", label: "Nama lengkap", width: 25 },
      { field: "gender", label: "L/P", width: 30 },
      { field: "formerSchool", label: "Asal sekolah", width: 30 },
      { field: "major", label: "Jurusan yang dipilih", width: 30 },
      { field: "address", label: "Alamat", width: 40 },
      { field: "phoneNumber", label: "No. Telpon Siswa", width: 30 },
      { field: "parentPhoneNumber", label: "No. Telpon Orangtua", width: 30 },
    ],
    content: mappedData,
    fileName: "Rekap PPDB Siswa",
    startRow: 4,
  });

  table.worksheet.cell(1, 1, 1, 10, true).string("REKAP SISWA");
  table.worksheet
    .cell(2, 1, 2, 10, true)
    .string(`PPDB SMK BINA TARUNA JALANCAGAK TAHUN ${currentConfig.year}`);
  table.worksheet.cell(1, 1, 2, 10).style(table.textCenter);

  return await table.sendAsResponse();
};
