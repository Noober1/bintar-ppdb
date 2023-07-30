import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { changeNameForm } from "@/lib/formSchemas";
import { HttpStatusCode } from "axios";
import { getSessionUser } from "@/lib/session";

export const PUT: RequestHandler = async (request) => {
  try {
    const session = await getSessionUser();
    if (!session)
      throw new RouteExceptionError(
        "Session not found",
        HttpStatusCode.Unauthorized
      );

    const getUserData = await prisma.user.findUnique({
      where: { id: session.id },
    });
    if (!getUserData) throw new RouteExceptionError("User not found");

    const getRequestData = await request.json();
    const data = await changeNameForm.validate(getRequestData);

    const updating = await prisma.user.update({
      where: { id: session.id },
      data: {
        fullname: data.fullName,
      },
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
