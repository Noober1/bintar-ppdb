import { schoolForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

type Params = {
  params: {
    schoolId: string;
  };
};

const PUT: RequestHandler = async (
  request,
  { params: { schoolId } }: Params
) => {
  try {
    const id = parseInt(schoolId[0]);
    const getRequestData = await request.json();
    const validatedData = await schoolForm.validate(getRequestData);
    const findData = await prisma.school.count({
      where: {
        id,
      },
    });

    if (!findData) {
      throw new Error("Sekolah tidak ditemukan");
    }

    const updateData = await prisma.school.update({
      where: {
        id,
      },
      data: {
        address: validatedData.address,
        name: validatedData.name,
        NPSN: validatedData.NPSN,
        type: validatedData.type,
      },
    });

    return NextResponse.json({
      success: true,
      result: updateData,
    });
  } catch (error) {
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

    return NextResponse.json(
      {
        success: false,
        message: "unknown error",
      },
      {
        status: 500,
      }
    );
  }
};

export { PUT };
