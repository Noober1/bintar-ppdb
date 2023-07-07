import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

const PUT: RequestHandler = async (
  request,
  { params: { id: configId } }: Params
) => {
  return NextResponse.json({
    success: false,
  });
};

const GET: RequestHandler = async (
  request,
  { params: { id: configId } }: Params
) => {
  try {
    const id = parseInt(configId[0]);
    const findData = await prisma.config.count({
      where: {
        id,
      },
    });

    if (!findData) {
      throw new Error("Konfigurasi tidak ditemukan");
    }

    await prisma.config.updateMany({
      where: {
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    const updateData = await prisma.config.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updateData,
    });
  } catch (error) {
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        success: false,
        message: isErrorMessage ? error.message : "Unknown error",
      },
      {
        status: isErrorMessage ? 400 : 500,
      }
    );
  }
};

export { PUT, GET };
