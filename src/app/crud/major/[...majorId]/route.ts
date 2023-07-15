import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
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
    return sendErrorResponse(error);
  }
};

export { PUT };
