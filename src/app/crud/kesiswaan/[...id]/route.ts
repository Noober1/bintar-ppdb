import { kesiswaanForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

const PUT: RequestHandler = async (
  request,
  { params: { id: studentId } }: Params
) => {
  try {
    const id = parseInt(studentId[0]);
    const getRequestData = await request.json();
    const validatedData = await kesiswaanForm.validate(getRequestData);

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
