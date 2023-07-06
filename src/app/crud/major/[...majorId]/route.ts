import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

type Params = {
  params: {
    majorId: string;
  };
};

const PUT: RequestHandler = async (
  request,
  { params: { majorId } }: Params
) => {
  try {
    const id = parseInt(majorId[0]);
    const getRequestData = await request.json();
    const findData = await prisma.major.count({
      where: {
        id,
      },
    });

    if (!findData) {
      throw new Error("Jurusan tidak ditemukan");
    }

    const updateData = await prisma.major.update({
      where: {
        id,
      },
      data: {
        initial: getRequestData.initial,
        name: getRequestData.name,
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
