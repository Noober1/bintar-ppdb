import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

export const GET: RequestHandler = async () => {
  const getCurrentConfig = await prisma.config.findFirst({
    where: { isActive: true },
  });

  try {
    return NextResponse.json({
      id: getCurrentConfig?.id,
      year: getCurrentConfig?.year,
      isActive: getCurrentConfig?.isActive,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
