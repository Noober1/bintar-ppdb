import { measureForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const getRequestData = await request.json();
    const validatedData = await measureForm.validate(getRequestData);

    // find student
    const getStudentData = await prisma.student.count({
      where: {
        id,
      },
    });

    if (!getStudentData) {
      throw new Error("Siswa tidak ada");
    }

    // if clear, update data
    const updateData = await prisma.student.update({
      where: {
        id,
      },
      data: {
        ...validatedData,
        measureEdited: true,
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
