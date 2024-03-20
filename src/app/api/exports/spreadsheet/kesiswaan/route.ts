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

  const getKesiswaanData = await prisma.student.findMany({
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
      parentPhoneNumber: true,
      address: true,
      extracurricular: true,
      weight: true,
      height: true,
      relapsingIllness: true,
      seriousIllness: true,
      haveSkipLesson: true,
      haveTruancy: true,
      haveADate: true,
      haveDrunked: true,
      haveFought: true,
      haveJoinedCriminalGang: true,
      haveTattoo: true,
      haveWatchedPorn: true,
      isDrug: true,
      isIlliterate: true,
      isPierced: true,
      isSmoker: true,
    },
    where: {
      configId: currentConfig.id,
    },
    orderBy: {
      registrationNumber: "asc",
    },
  });

  const fileData = getKesiswaanData.map((value, index) => {
    return {
      number: index + 1,
      registrationNumber: value.registrationNumber || "",
      fullName: (value.firstName || "") + " " + (value.lastName || ""),
      formerSchool: value.formerSchool?.name || "",
      lesson: value.haveSkipLesson ? "☑" : "▢",
      truancy: value.haveTruancy ? "☑" : "▢",
      drunked: value.haveDrunked ? "☑" : "▢",
      fought: value.haveFought ? "☑" : "▢",
      gang: value.haveJoinedCriminalGang ? "☑" : "▢",
      porn: value.haveWatchedPorn ? "☑" : "▢",
      dating: value.haveADate ? "☑" : "▢",
      tatto: value.haveTattoo ? "☑" : "▢",
      smoking: value.isSmoker ? "☑" : "▢",
      pierced: value.isPierced ? "☑" : "▢",
      drugs: value.isDrug ? "☑" : "▢",
      illiterate: value.isIlliterate ? "☑" : "▢",
    };
  });

  const table = new ExcelMaker({
    headers: [
      { field: "number", label: "No", width: 3 },
      { field: "registrationNumber", label: "No. Registrasi", width: 16 },
      { field: "fullName", label: "Nama siswa", width: 25 },
      { field: "formerSchool", label: "Asal sekolah", width: 25 },
      { field: "lesson", label: "Pernah kabur?", width: 5 },
      { field: "truancy", label: "Pernah bolos?", width: 5 },
      { field: "drunked", label: "Pernah mabuk?", width: 5 },
      { field: "fought", label: "Pernah berkelahi?", width: 5 },
      { field: "gang", label: "Pernah mengikuti geng kriminal?", width: 5 },
      { field: "porn", label: "Pernah nonton video porno?", width: 5 },
      { field: "dating", label: "Pernah pacaran?", width: 5 },
      { field: "tatto", label: "Apakah ditato?", width: 5 },
      { field: "smoking", label: "Pernah merokok?", width: 5 },
      { field: "pierced", label: "Apakah ditindik?", width: 5 },
      { field: "drugs", label: "Pernah mengonsumsi narkoba?", width: 5 },
      { field: "illiterate", label: "Apakah buta huruf?", width: 5 },
    ],
    content: fileData,
    fileName: "Rekap PPDB kesiswaan",
  });

  table.worksheet.cell(1, 1, 1, 16, true).string("REKAP BERKAS");
  table.worksheet
    .cell(2, 1, 2, 16, true)
    .string(`PPDB SMK BINA TARUNA JALANCAGAK TAHUN ${currentConfig.year}`);
  table.worksheet.cell(1, 1, 2, 16).style(table.textCenter);
  table.worksheet.cell(4, 1, 4, 4).style(table.textCenter);
  table.worksheet
    .cell(4, 5, 4, 16)
    .style(table.verticalOrientation)
    .style(table.textCenter);

  // send it as http response
  return await table.sendAsResponse();
};
