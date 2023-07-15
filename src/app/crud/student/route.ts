import { checkConfigOrThrow, sendErrorResponse } from "@/lib/serverUtils";
import { basicForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

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
    return sendErrorResponse(error);
  }
};

export { POST };
