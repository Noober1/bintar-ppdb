import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { getServerSession } from "next-auth";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { changeNameForm } from "@/lib/formSchemas";

export const PUT: RequestHandler = async (request) => {
  try {
    const session = await getServerSession();
    if (!session) throw new RouteExceptionError("Session not found");

    const getUserData = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!getUserData) throw new RouteExceptionError("User not found");

    const getRequestData = await request.json();
    const data = await changeNameForm.validate(getRequestData);

    const updating = await prisma.user.update({
      where: { email: session.user.email },
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
