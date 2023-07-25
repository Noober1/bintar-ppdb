import { prisma } from "@/lib/prisma";
import { sendErrorResponse, RouteExceptionError } from "@/lib/routeUtils";
import { TableRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const deleteRoute: TableRequestHandler = async (
  request,
  { params: { table: endpoint } }
) => {
  try {
    const getDataRequest = await request.json();
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
          throw new RouteExceptionError("Invalid data");
        }

        await prisma.major.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      case "school":
        if (isNaN(parseInt(getDataRequest.data))) {
          throw new RouteExceptionError("Invalid data");
        }

        const getStudentFromSchool = await prisma.student.count({
          where: { schoolId: getDataRequest.data },
        });

        if (!getStudentFromSchool) {
          await prisma.school.delete({
            where: {
              id: getDataRequest.data,
            },
          });
        }
        break;
      case "configuration":
        const getCurrentConfig = await prisma.config.findFirst({
          where: { id: getDataRequest.data },
        });

        if (!getCurrentConfig) {
          throw new RouteExceptionError("Konfigurasi tidak ada");
        }

        if (getCurrentConfig.isActive) {
          throw new RouteExceptionError(
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
          throw new RouteExceptionError(
            "Ada data siswa yang berkaitan dengan data ini"
          );
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
      case "administration":
        await prisma.administration.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      default:
        throw new RouteExceptionError("Endpoint invalid");
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export default deleteRoute;
