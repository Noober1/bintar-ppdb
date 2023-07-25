import { schoolForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const POST: RequestHandler = async (request) => {
  try {
    // validate request data
    const getRequestData = await request.json();
    const validatedForm = await schoolForm.validate(getRequestData);

    // check duplicate npsn
    const getDataFromDb = await prisma.school.count({
      where: { NPSN: validatedForm.NPSN },
    });
    if (getDataFromDb) {
      throw new RouteExceptionError("Data dengan NPSN yang sama telah ada");
    }

    const insertData = await prisma.school.create({
      data: {
        NPSN: validatedForm.NPSN,
        address: validatedForm.address,
        name: validatedForm.name,
        type: validatedForm.type,
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
