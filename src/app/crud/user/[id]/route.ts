import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendErrorResponse, RouteExceptionError } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";

const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const userId = parseInt(url.params.id);
    const getRequestData = await request.json();
    const findUser = await prisma.user.count({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new RouteExceptionError("Pengguna tidak ditemukan");
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: getRequestData.email,
        password:
          getRequestData.password != ""
            ? bcrypt.hashSync(getRequestData.password, 10)
            : undefined,
        fullname: getRequestData.fullname,
        grantedAccess: JSON.stringify(getRequestData.grantedAccess),
      },
    });

    return NextResponse.json({
      success: true,
      result: updateUser,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { PUT };
