import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { CrudRequestHandler, RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const GET: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const findData = await prisma.config.findUnique({
      where: {
        id,
      },
    });

    if (!findData) {
      throw new Error("Konfigurasi tidak ditemukan.");
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
        isActive: !findData.isActive,
      },
    });

    return NextResponse.json({
      success: true,
      data: updateData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { GET };
