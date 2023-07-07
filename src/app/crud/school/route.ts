import { schoolForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

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
      throw new Error("Data dengan NPSN yang sama telah ada");
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
    console.error(error);
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: "Request invalid",
          errors: error.errors,
        },
        {
          status: 400,
        }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      message: "Unknown error",
    },
    {
      status: 500,
    }
  );
};

export { POST };
