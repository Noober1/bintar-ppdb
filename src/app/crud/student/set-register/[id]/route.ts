import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const getStudentById = await prisma.student.findUnique({
      select: {
        isRegistered: true,
      },
      where: { id },
    });

    if (!getStudentById) {
      throw new RouteExceptionError("Siswa tidak ada");
    }

    const countAdministrationData = await prisma.administration.count({
      where: { studentId: id },
    });

    const updateStudent = await prisma.student.update({
      where: { id },
      data: {
        isRegistered: countAdministrationData
          ? true
          : !getStudentById.isRegistered,
      },
    });

    return NextResponse.json({
      success: true,
      result: updateStudent,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { PUT };
