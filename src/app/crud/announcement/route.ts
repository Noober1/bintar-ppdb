import { announcementForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { getSessionUser } from "@/lib/session";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const POST: RequestHandler = async (request) => {
  try {
    const user = await getSessionUser();
    const getRequestData = await request.json();
    const data = await announcementForm.validate(getRequestData);
    if (!user) throw new RouteExceptionError("User not found");

    const insertData = await prisma.announcement.create({
      data: {
        ...data,
        authorId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      result: insertData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
