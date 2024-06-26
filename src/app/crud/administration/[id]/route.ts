import { administrationForm } from "@/lib/formSchemas";
import { getSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const POST: CrudRequestHandler = async (request, params) => {
  try {
    // get all request data
    const requestData = await request.json();

    // validating request data, it will throw an error while invalid
    const data = await administrationForm.validate(requestData);

    // validate url params
    const getStudentId = parseInt(params.params.id);

    // check student from db
    const getStudentFromDB = await prisma.student.count({
      where: { id: getStudentId },
    });
    if (!getStudentFromDB) {
      throw new RouteExceptionError("Siswa tidak ditemukan");
    }

    // check userdata from session
    const session = await getSessionUser();
    if (!session) {
      throw new RouteExceptionError("Anda tidak mempunyai akses");
    }

    // inserting data to database
    const insertData = await prisma.administration.create({
      data: {
        dateCreated: data.date,
        description: data.description,
        nominal: data.nominal,
        payer: data.payer,
        userId: session.id,
        studentId: getStudentId,
      },
    });

    return NextResponse.json({
      success: true,
      result: insertData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

const PUT: CrudRequestHandler = async (request, params) => {
  try {
    const requestData = await request.json();
    const {date, ...validatedData} = await administrationForm.validate(requestData);

    const updatingData = await prisma.administration.update({
      where: { id: params.params.id },
      data: {
        ...validatedData,
        dateCreated: date
      },
    });
    return NextResponse.json({
      success: true,
      result: updatingData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { POST, PUT };
