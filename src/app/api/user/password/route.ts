import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { changePasswordForm } from "@/lib/formSchemas";
import bcrypt from "bcrypt";
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
    const data = await changePasswordForm.validate(getRequestData);

    const matchingPassword = bcrypt.compareSync(
      data.oldPassword,
      getUserData.password
    );
    if (!matchingPassword)
      throw new RouteExceptionError("Kata sandi lama salah.");

    const updating = await prisma.user.update({
      where: { id: session.id },
      data: {
        password: bcrypt.hashSync(data.password, 10),
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
