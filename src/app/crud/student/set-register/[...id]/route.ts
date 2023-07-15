import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

const PUT: RequestHandler = async (request, { params }: Params) => {
  try {
    const id = parseInt(params.id[0]);
    const getStudentById = await prisma.student.findUnique({
      select: {
        isRegistered: true,
      },
      where: { id },
    });

    if (!getStudentById) {
      throw new Error("Siswa tidak ada");
    }

    const updateStudent = await prisma.student.update({
      where: { id },
      data: {
        isRegistered: !getStudentById.isRegistered,
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
