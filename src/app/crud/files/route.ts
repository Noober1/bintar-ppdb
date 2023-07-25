import { filesForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const PUT: RequestHandler = async (request) => {
  try {
    const getData = await request.json();
    const validatedData = await filesForm.validate(getData);

    const updating = await prisma.student.updateMany({
      where: {
        id: validatedData.id,
      },
      data: {
        [validatedData.field]: validatedData.value,
        fileEdited: true,
      },
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { PUT };
