import { basicForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const getRequestData = await request.json();
    const { registrationNumber, ...validatedRequestData } = await basicForm(
      "edit"
    ).validate(getRequestData);

    // find student with same email
    const getStudentWithEmail = await prisma.student.count({
      where: {
        email: validatedRequestData.email,
        id: {
          not: id,
        },
      },
    });
    if (getStudentWithEmail) {
      throw new RouteExceptionError(
        "Pengguna dengan email yang sama telah ada"
      );
    }

    // validating school id
    const findSchool = await prisma.school.count({
      where: { id: validatedRequestData.schoolId },
    });
    if (!findSchool) {
      throw new RouteExceptionError("Sekolah tidak ada");
    }

    // validating major id
    const findMajor = await prisma.major.count({
      where: { id: validatedRequestData.majorId },
    });
    if (!findMajor) {
      throw new RouteExceptionError("Jurusan tidak ada");
    }

    // if clear, update data
    const updateData = await prisma.student.update({
      where: {
        id,
      },
      data: validatedRequestData,
    });

    return NextResponse.json({
      success: true,
      result: updateData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { PUT };
