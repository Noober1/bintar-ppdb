import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { getServerSession } from "next-auth";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { changePasswordForm } from "@/lib/formSchemas";
import bcrypt from "bcrypt";

export const PUT: RequestHandler = async (request) => {
  try {
    const session = await getServerSession();
    if (!session) throw new RouteExceptionError("Session not found");
    console.log(session);

    const getUserData = await prisma.user.findUnique({
      where: { email: session.user.email },
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
      where: { email: session.user.email },
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
