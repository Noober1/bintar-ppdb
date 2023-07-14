import { measureForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

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
    const isErrorMessage = error instanceof Error;
    const isValidatingError = error instanceof ValidationError;

    return NextResponse.json(
      {
        success: false,
        message:
          isErrorMessage || isValidatingError ? error.message : "unknown error",
      },
      {
        status: isErrorMessage || isValidatingError ? 400 : 500,
      }
    );
  }
};

export { PUT };