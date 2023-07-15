import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendErrorResponse } from "@/lib/serverUtils";

const PUT = async (
  request: Request,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  }
) => {
  try {
    const userId = parseInt(params.userId[0]);
    const getRequestData = await request.json();
    const findUser = await prisma.user.count({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new Error("Pengguna tidak ditemukan");
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
