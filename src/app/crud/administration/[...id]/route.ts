import { administrationForm } from "@/lib/formSchemas";
import authOptions from "@/lib/nextAuthOption";
import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type RequestParams = { params: { id: string } };

const POST: RequestHandler = async (request, params: RequestParams) => {
  try {
    // get all request data
    const requestData = await request.json();

    // validating request data, it will throw an error while invalid
    const data = await administrationForm("add").validate(requestData);

    // validate url params
    const getStudentId = parseInt(params.params.id);

    // check student from db
    const getStudentFromDB = await prisma.student.count({
      where: { id: getStudentId },
    });
    if (!getStudentFromDB) {
      throw new Error("Siswa tidak ditemukan");
    }

    // check userdata from session
    const getUserData = await getServerSession(authOptions);
    if (!getUserData) {
      throw new Error("Anda tidak mempunyai akses");
    }

    // inserting data to database
    const insertData = await prisma.administration.create({
      data: {
        description: data.description,
        nominal: data.nominal,
        payer: data.payer,
        userId: getUserData.user.id,
        studentId: getStudentId,
      },
    });

    return NextResponse.json({
      success: true,
      result: insertData,
    });
  } catch (error) {
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        success: false,
        message: isErrorMessage ? error.message : "unknown error",
      },
      {
        status: isErrorMessage ? 400 : 500,
      }
    );
  }
};

const PUT: RequestHandler = async (request, params: RequestParams) => {
  try {
    const requestData = await request.json();
    const validatedData = await administrationForm("edit").validate(
      requestData
    );

    const updatingData = await prisma.administration.update({
      where: { id: params.params.id[0] },
      data: validatedData,
    });
    return NextResponse.json({
      success: true,
      result: updatingData,
    });
  } catch (error) {
    const isErrorMessage = error instanceof Error;
    return NextResponse.json(
      {
        success: false,
        message: isErrorMessage ? error.message : "unknown error",
      },
      {
        status: isErrorMessage ? 400 : 500,
      }
    );
  }
};

export { POST, PUT };
