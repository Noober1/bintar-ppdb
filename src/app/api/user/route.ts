import { ROLES } from "@/constants/roles";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { USER_TYPES } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

export interface UserDataResponse {
  isLoggedIn: true;
  id: number;
  email: string;
  fullname: string;
  grantedAccess: ROLES[];
  type: USER_TYPES;
}

export const GET: RequestHandler = async () => {
  try {
    const session = await getServerSession();
    if (!session) throw new Error("Session not found");

    const getUserdata = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        fullname: true,
        grantedAccess: true,
        type: true,
      },
      where: { id: session.user.id },
    });
    if (!getUserdata) throw new Error("User not found");

    return NextResponse.json({
      isLoggedIn: true,
      ...getUserdata,
      grantedAccess: JSON.parse(getUserdata.grantedAccess?.toString() || "[]"),
    });
  } catch (error) {
    console.error(error);
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        isLoggedIn: false,
        message: isErrorMessage ? error.message : "Unknown error",
      },
      {
        status: isErrorMessage ? 401 : 500,
      }
    );
  }
};
