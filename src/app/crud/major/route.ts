import { majorForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const POST: RequestHandler = async (request) => {
  try {
    // validate request data
    const getRequestData = await request.json();
    const validatedForm = await majorForm.validate(getRequestData);

    // check duplicate initial
    const getDataFromDb = await prisma.major.count({
      where: { initial: validatedForm.initial },
    });
    if (getDataFromDb) {
      throw new RouteExceptionError("Data dengan inisial yang sama telah ada");
    }

    const insertData = await prisma.major.create({
      data: {
        initial: validatedForm.initial,
        name: validatedForm.name,
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
