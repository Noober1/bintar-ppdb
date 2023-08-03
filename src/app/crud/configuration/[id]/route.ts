import { configurationForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

// switch configuration status
export const GET: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const findData = await prisma.config.findUnique({
      where: {
        id,
      },
    });

    if (!findData) {
      throw new RouteExceptionError("Konfigurasi tidak ditemukan.");
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

export const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const getRequestData = await request.json();
    const data = await configurationForm.validate(getRequestData);
    const startDate = new Date(data.registrationDateOpen);
    const endDate = new Date(data.registrationDateClose);

    const getConfig = await prisma.config.findUnique({
      where: { id },
    });
    if (!getConfig) throw new RouteExceptionError("Configuration not found");
    if (endDate < startDate)
      throw new RouteExceptionError("Day registration invalid");

    const updating = await prisma.config.update({
      where: { id },
      data,
    });
    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
