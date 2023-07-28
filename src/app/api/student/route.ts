import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { RequestHandler } from "@/types/route";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

export const GET: RequestHandler = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const phoneNumber = searchParams.get("phone");
    //   if email or phone is invalid
    if (!email || !phoneNumber)
      throw new RouteExceptionError(
        "Invalid request",
        HttpStatusCode.BadRequest
      );

    const getData = await prisma.student.findFirst({
      where: {
        email,
        phoneNumber,
      },
      select: {
        id: true,
        email: true,
      },
    });

    //   if student not found
    if (!getData)
      throw new RouteExceptionError(
        "Data not found",
        HttpStatusCode.Unauthorized
      );

    return NextResponse.json(getData);
  } catch (error) {
    return sendErrorResponse(error);
  }
};
