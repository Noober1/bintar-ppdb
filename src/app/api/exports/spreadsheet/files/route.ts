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

  const getFileData = await prisma.student.findMany({
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
      fileNISN: true,
      fileKIPKPS: true,
      fileKTP: true,
      fileIjazah: true,
      fileSKHUN: true,
      fileSTK: true,
      fileAkta: true,
      fileKK: true,
      fileRaport: true,
      filePhoto23: true,
      fileEdited: true,
      fileMCU: true,
      filePhoto34: true,
      fileSKB: true,
    },
    where: {
      configId: currentConfig.id,
    },
    orderBy: {
      registrationNumber: "asc",
    },
  });

  const fileData = getFileData.map((value, index) => {
    return {
      number: index + 1,
      registrationNumber: value.registrationNumber || "",
      fullName: (value.firstName || "") + " " + (value.lastName || ""),
      formerSchool: value.formerSchool?.name || "",
      NISN: value.fileNISN ? "☑" : "▢",
      KIPKPS: value.fileKIPKPS ? "☑" : "▢",
      KTP: value.fileKTP ? "☑" : "▢",
      Ijazah: value.fileIjazah ? "☑" : "▢",
      SKHUN: value.fileSKHUN ? "☑" : "▢",
      STK: value.fileSTK ? "☑" : "▢",
      Akta: value.fileAkta ? "☑" : "▢",
      KK: value.fileKK ? "☑" : "▢",
      Raport: value.fileRaport ? "☑" : "▢",
      Photo23: value.filePhoto23 ? "☑" : "▢",
      MCU: value.fileMCU ? "☑" : "▢",
      Photo34: value.filePhoto34 ? "☑" : "▢",
      SKB: value.fileSKB ? "☑" : "▢",
    };
  });

  const table = new ExcelMaker({
    headers: [
      { field: "number", label: "No", width: 3 },
      { field: "registrationNumber", label: "No. Registrasi", width: 16 },
      { field: "fullName", label: "Nama siswa", width: 25 },
      { field: "formerSchool", label: "Asal sekolah", width: 25 },
      { field: "NISN", label: "NISN", width: 5 },
      { field: "KIPKPS", label: "KIP/KPS", width: 5 },
      { field: "KTP", label: "KTP", width: 5 },
      { field: "MCU", label: "Surat Keterangan Dokter", width: 5 },
      { field: "Ijazah", label: "Ijazah", width: 5 },
      { field: "SKHUN", label: "SKHUN", width: 5 },
      { field: "STK", label: "Surat Tanda Kelulusan", width: 5 },
      { field: "Akta", label: "Akta Kelahiran", width: 5 },
      { field: "KK", label: "Kartu Keluarga", width: 5 },
      { field: "Raport", label: "Raport", width: 5 },
      { field: "SKB", label: "Surat Kelakuan Baik", width: 5 },
      { field: "Photo23", label: "Pas Foto 2X3", width: 5 },
      { field: "Photo34", label: "Pas Foto 3X4", width: 5 },
    ],
    content: fileData,
    fileName: "Rekap PPDB kelengkapan berkas",
  });

  table.worksheet.cell(1, 1, 1, 17, true).string("REKAP BERKAS");
  table.worksheet
    .cell(2, 1, 2, 17, true)
    .string(`PPDB SMK BINA TARUNA JALANCAGAK TAHUN ${currentConfig.year}`);
  table.worksheet.cell(1, 1, 2, 17).style(table.textCenter);
  table.worksheet.cell(4, 1, 4, 4).style(table.textCenter);
  table.worksheet
    .cell(4, 5, 4, 17)
    .style(table.verticalOrientation)
    .style(table.textCenter);

  // send it as http response
  return await table.sendAsResponse();
};
