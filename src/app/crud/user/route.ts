import { userForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { RequestHandler } from "@/types/route";
import { sendErrorResponse } from "@/lib/serverUtils";

const POST: RequestHandler = async (request) => {
  const getRequestData = await request.json();
  try {
    // validate received data from client
    const getValidatedData = await userForm("add").validate(getRequestData);
    // check email from database
    const isEmailExist = await prisma.user.count({
      where: { email: getValidatedData.email },
    });
    // if exist, return error
    if (isEmailExist) {
      throw new Error("Email telah ada");
    }

    // inserting data
    const insertData = await prisma.user.create({
      data: {
        email: getValidatedData.email,
        fullname: getValidatedData.fullname,
        grantedAccess: JSON.stringify(getValidatedData.grantedAccess),
        password: bcrypt.hashSync(
          getValidatedData?.password || "bintar701",
          10
        ),
      },
    });

    // send response to client
    return NextResponse.json({
      success: true,
      message: "Data user berhasil disimpan",
      result: insertData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { POST };
