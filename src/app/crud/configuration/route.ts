import { configurationForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const POST: RequestHandler = async (request) => {
  try {
    // validate request data
    const getRequestData = await request.json();
    const validatedForm = await configurationForm.validate(getRequestData);

    // check duplicate initial
    const getDataFromDb = await prisma.config.count({
      where: { year: validatedForm.year },
    });
    if (getDataFromDb) {
      throw new RouteExceptionError("Data dengan tahun yang sama telah ada");
    }

    const insertData = await prisma.config.create({
      data: {
        year: validatedForm.year,
        isActive: false,
        registrationFormat:
          validatedForm.registrationFormat == ""
            ? undefined
            : validatedForm.registrationFormat,
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
