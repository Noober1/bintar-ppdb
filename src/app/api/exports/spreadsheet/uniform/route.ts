import { CrudRequestHandler } from "@/types/route";
import { getCurrentConfig } from "@/lib/serverUtils";
import { prisma } from "@/lib/prisma";
import ExcelMaker from "@/lib/tableMaker";
import { RouteExceptionError } from "@/lib/routeUtils";

export const dynamic = "force-dynamic";

export const GET: CrudRequestHandler = async () => {
  const currentConfig = await getCurrentConfig();
  if (!currentConfig)
    throw new RouteExceptionError("No active configuration", 404);

  const getUkuranData = await prisma.student.findMany({
    select: {
      id: true,
      registrationNumber: true,
      firstName: true,
      lastName: true,
      formerSchool: {
        select: {
          name: true,
        },
      },
      primaryUniformSize: true,
      secondaryUniformSize: true,
      gymUniformSize: true,
      shoeSize: true,
    },
    where: {
      configId: currentConfig.id,
    },
    orderBy: {
      registrationNumber: "asc",
    },
  });

  const fileData = getUkuranData.map((value, index) => {
    return {
      number: index + 1,
      registrationNumber: value.registrationNumber || "",
      fullName: (value.firstName || "") + " " + (value.lastName || ""),
      formerSchool: value.formerSchool?.name || "",
      primary: value.primaryUniformSize || "",
      secondary: value.secondaryUniformSize || "",
      gym: value.gymUniformSize || "",
      shoe: value.shoeSize ? value.shoeSize + " CM" : "",
    };
  });

  const table = new ExcelMaker({
    headers: [
      { field: "number", label: "No", width: 3 },
      { field: "registrationNumber", label: "No. Registrasi", width: 16 },
      { field: "fullName", label: "Nama siswa", width: 25 },
      { field: "formerSchool", label: "Asal sekolah", width: 25 },
      { field: "primary", label: "Ukuran seragam bintar", width: 5 },
      { field: "secondary", label: "Ukuran baju praktek", width: 5 },
      { field: "gym", label: "Ukuran baju olahraga", width: 5 },
      { field: "shoe", label: "Ukuran Sepatu", width: 10 },
    ],
    content: fileData,
    fileName: "Rekap PPDB pengukuran seragam",
  });

  table.worksheet.cell(1, 1, 1, 8, true).string("REKAP BERKAS");
  table.worksheet
    .cell(2, 1, 2, 8, true)
    .string(`PPDB SMK BINA TARUNA JALANCAGAK TAHUN ${currentConfig.year}`);
  table.worksheet.cell(1, 1, 2, 8).style(table.textCenter);
  table.worksheet.cell(4, 1, 4, 4).style(table.textCenter);
  table.worksheet
    .cell(4, 5, 4, 8)
    .style(table.verticalOrientation)
    .style(table.textCenter);

  // send it as http response
  return await table.sendAsResponse();
};
