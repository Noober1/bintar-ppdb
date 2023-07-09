import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { Params, TableList } from "@/types/table";
import { NextResponse } from "next/server";

const deleteRoute: RequestHandler = async (request, params: Params) => {
  try {
    const getDataRequest = await request.json();
    const endpoint = params.params.table[0] as TableList;
    switch (endpoint) {
      case "user":
        await prisma.user.deleteMany({
          where: {
            id: {
              in: getDataRequest.data,
            },
            type: {
              not: "ADMINISTRATOR",
            },
          },
        });
        break;
      case "major":
        if (isNaN(parseInt(getDataRequest.data))) {
          throw new Error("Invalid data");
        }

        await prisma.major.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      case "school":
        if (isNaN(parseInt(getDataRequest.data))) {
          throw new Error("Invalid data");
        }

        await prisma.school.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      case "configuration":
        const getCurrentConfig = await prisma.config.findFirst({
          where: { id: getDataRequest.data },
        });

        if (!getCurrentConfig) {
          throw new Error("Konfigurasi tidak ada");
        }

        if (getCurrentConfig.isActive) {
          throw new Error(
            "Konfigurasi sedang aktif, nonaktifkan terlebih dahulu"
          );
        }

        const findStudentByYear = await prisma.student.count({
          where: {
            year: {
              id: getDataRequest.data,
            },
          },
        });
        if (findStudentByYear) {
          throw new Error("Ada data siswa yang berkaitan dengan data ini");
        }

        await prisma.config.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      case "basic":
        await prisma.student.deleteMany({
          where: {
            id: {
              in: getDataRequest.data,
            },
            isRegistered: false,
          },
        });
        break;
      default:
        throw new Error("Endpoint invalid");
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        success: false,
        message: isErrorMessage ? error.message : "Unknown error",
      },
      {
        status: isErrorMessage ? 400 : 500,
      }
    );
  }
};

export default deleteRoute;
