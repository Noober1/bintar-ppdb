import { majorForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

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
      throw new Error("Data dengan inisial yang sama telah ada");
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
