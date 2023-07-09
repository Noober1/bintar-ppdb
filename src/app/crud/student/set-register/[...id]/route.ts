import { prisma } from "@/lib/prisma";
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
    const isErrorMessage = error instanceof Error;
    return NextResponse.json({
      success: false,
      message: isErrorMessage ? error.message : "Unknown error",
    });
  }
};

export { PUT };
