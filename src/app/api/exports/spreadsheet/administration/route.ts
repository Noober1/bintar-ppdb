import { CrudRequestHandler } from "@/types/route";
import { getCurrentConfig, numberToCurrency } from "@/lib/serverUtils";
import { prisma } from "@/lib/prisma";
import ExcelMaker from "@/lib/tableMaker";
import { RouteExceptionError } from "@/lib/routeUtils";

export const dynamic = "force-dynamic";

export const GET: CrudRequestHandler = async () => {
  const currentConfig = await getCurrentConfig();
  if (!currentConfig)
    throw new RouteExceptionError("No active configuration", 404);

  const getAdministrationData = await prisma.administration.findMany({
    select: {
      student: {
        select: {
          registrationNumber: true,
          firstName: true,
          lastName: true,
          formerSchool: {
            select: {
              name: true,
            },
          },
        },
      },
      id: true,
      dateCreated: true,
      updatedAt: true,
      description: true,
      payer: true,
      nominal: true,
      administrator: {
        select: {
          fullname: true,
        },
      },
    },
    where: {
      student: {
        configId: currentConfig.id,
      },
    },
    orderBy: {
      studentId: "desc",
    },
  });

  let totalNominal: number = 0;
  const adminisitrationData = getAdministrationData.map((value, index) => {
    totalNominal += value.nominal || 0;
    return {
      number: index + 1,
      registrationNumber: value.student.registrationNumber || "",
      fullName:
        (value.student.firstName || "") + " " + (value.student.lastName || ""),
      formerSchool: value.student.formerSchool?.name || "",
      createdAt: value.dateCreated || "",
      updatedAt: value.updatedAt || "",
      description: value.description,
      payer: value.payer,
      nominal: numberToCurrency(value.nominal || 0),
      administrator: value.administrator.fullname || "",
    };
  });

  const table = new ExcelMaker({
    headers: [
      { field: "number", label: "No", width: 3 },
      { field: "registrationNumber", label: "No. Registrasi", width: 16 },
      { field: "fullName", label: "Nama siswa", width: 25 },
      { field: "formerSchool", label: "Asal sekolah", width: 25 },
      { field: "createdAt", label: "Tanggal dibuat", width: 15 },
      { field: "updatedAt", label: "Tanggal diperbarui", width: 15 },
      { field: "description", label: "Deskripsi pembayaran", width: 45 },
      { field: "payer", label: "Pembayar", width: 25 },
      { field: "administrator", label: "Petugas administrasi", width: 25 },
      { field: "nominal", label: "Nominal", width: 15 },
    ],
    content: adminisitrationData,
    fileName: "Rekap PPDB administrasi",
  });

  table.worksheet
    .cell(table.lastRow + 1, 1, table.lastRow + 1, table.lastColumn - 1, true)
    .string("Total pembayaran")
    .style(table.textCenter)
    .style(table.allBorder);
  table.worksheet
    .cell(table.lastRow + 1, table.lastColumn)
    .string(numberToCurrency(totalNominal))
    .style(table.allBorder);

  table.worksheet.cell(1, 1, 1, 10, true).string("REKAP PEMBAYARAN");
  table.worksheet
    .cell(2, 1, 2, 10, true)
    .string(`PPDB SMK BINA TARUNA JALANCAGAK TAHUN ${currentConfig.year}`);
  table.worksheet.cell(1, 1, 2, 10).style(table.textCenter);

  // send it as http response
  return await table.sendAsResponse();
};
