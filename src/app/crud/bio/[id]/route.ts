import { bioForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const PUT: CrudRequestHandler = async (request, url) => {
  try {
    // get id from url params
    const id = parseInt(url.params.id);
    // check student from db
    const getStudent = await prisma.student.count({ where: { id } });
    if (!getStudent) {
      throw new Error("Siswa tidak ditemukan");
    }
    // get form from request data
    const data = await request.json();
    // validate form
    const validatedData = await bioForm.validate(data);
    // check schoolId
    const checkSchool = await prisma.school.count({
      where: { id: validatedData.schoolId },
    });
    if (!checkSchool) {
      throw new Error("Sekolah tidak ditemukan");
    }
    // check majorId
    const checkMajor = await prisma.major.count({
      where: { id: validatedData.majorId },
    });
    if (!checkMajor) {
      throw new Error("Jurusan tidak ditemukan");
    }

    const updatingData = await prisma.student.update({
      where: { id },
      data: { ...validatedData, bioEdited: true },
    });

    return NextResponse.json({
      success: true,
      result: updatingData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { PUT };