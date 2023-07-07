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
        address: getRequestData.address,
        name: getRequestData.name,
        NPSN: getRequestData.NPSN,
        type: getRequestData.type,
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
