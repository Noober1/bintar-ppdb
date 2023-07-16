import { majorForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const getRequestData = await request.json();
    const validatedData = await majorForm.validate(getRequestData);
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
        initial: validatedData.initial,
        name: validatedData.name,
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
