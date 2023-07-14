import { filesForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
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
      },
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        success: false,
        message: isErrorMessage ? error.message : "unknown error",
      },
      {
        status: isErrorMessage ? 400 : 500,
      }
    );
  }
};

export { PUT };
