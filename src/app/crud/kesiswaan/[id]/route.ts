import { kesiswaanForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const getRequestData = await request.json();
    const validatedData = await kesiswaanForm.validate(getRequestData);

    // find student
    const getStudentData = await prisma.student.count({
      where: {
        id,
      },
    });

    if (!getStudentData) {
      throw new RouteExceptionError("Siswa tidak ada");
    }

    // if clear, update data
    const updateData = await prisma.student.update({
      where: {
        id,
      },
      data: {
        ...validatedData,
        historyEdited: true,
      },
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
