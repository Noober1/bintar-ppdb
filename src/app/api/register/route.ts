import { basicForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import {
  generateRegistrationNumber,
  getCurrentConfig,
  verifyCaptcha,
} from "@/lib/serverUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

export const POST: CrudRequestHandler = async (request) => {
  try {
    const requestData = await request.json();
    const currentConfig = await getCurrentConfig();
    if (!currentConfig)
      throw new RouteExceptionError("Tidak ada konfigurasi yang aktif", 404);

    // validate request data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { captchaToken, ...data } = await basicForm("register").validate(
      requestData
    );

    // verify captcha
    await verifyCaptcha(requestData.captchaToken);

    // email validation here
    const findSchool = await prisma.school.findUnique({
      where: {
        id: data.schoolId,
      },
    });

    // school validation here
    if (!findSchool) throw new RouteExceptionError("Sekolah tidak ditemukan");

    // major validation here
    const findMajor = await prisma.major.findUnique({
      where: { id: data.majorId },
    });
    if (!findMajor) throw new RouteExceptionError("Jurusan tidak ditemukan");

    // find email
    const findEmail = await prisma.student.findUnique({
      where: { email: data.email },
    });
    if (findEmail) throw new RouteExceptionError("Email telah ada");

    // generate registration number
    const registrationNumber = await generateRegistrationNumber("online");

    // inserting data
    const insert = await prisma.student.create({
      data: {
        ...data,
        registrationNumber,
        configId: currentConfig.id,
      },
    });

    return NextResponse.json({
      success: true,
      result: insert,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
