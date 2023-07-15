import { basicForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
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
      throw new Error("Pengguna dengan email yang sama telah ada");
    }

    // validating school id
    const findSchool = await prisma.school.count({
      where: { id: validatedRequestData.schoolId },
    });
    if (!findSchool) {
      throw new Error("Sekolah tidak ada");
    }

    // validating major id
    const findMajor = await prisma.major.count({
      where: { id: validatedRequestData.majorId },
    });
    if (!findMajor) {
      throw new Error("Jurusan tidak ada");
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
