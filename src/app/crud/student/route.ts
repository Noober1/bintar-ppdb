import { checkConfigOrThrow } from "@/lib/serverUtils";
import { basicForm, schoolForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

const POST: RequestHandler = async (request) => {
  try {
    // check current config, throw error if no one active config found
    const config = await checkConfigOrThrow();

    // validate request data
    const getRequestData = await request.json();
    const validatedForm = await basicForm("add").validate(getRequestData);

    // check duplicate email
    const getDataFromDb = await prisma.student.count({
      where: { email: validatedForm.email },
    });
    if (getDataFromDb) {
      throw new Error("Siswa dengan email yang sama telah ada");
    }

    // major validation
    const getMajorCount = await prisma.major.count({
      where: { id: validatedForm.majorId },
    });
    if (!getMajorCount) {
      throw new Error("Jurusan tidak ada");
    }

    // major validation
    const getSchoolCount = await prisma.school.count({
      where: { id: validatedForm.schoolId },
    });
    if (!getSchoolCount) {
      throw new Error("Sekolah tidak ada");
    }

    const insertData = await prisma.student.create({
      data: {
        ...validatedForm,
        configId: config.id,
      },
    });

    return NextResponse.json({
      success: true,
      result: insertData,
    });
  } catch (error) {
    const isValidationError = error instanceof ValidationError;
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        success: false,
        message: isValidationError
          ? "Request tidak valid"
          : isErrorMessage
          ? error.message
          : "Unknown error",
      },
      {
        status: isValidationError || isErrorMessage ? 400 : 500,
      }
    );
  }
};

export { POST };
