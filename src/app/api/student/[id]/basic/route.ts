import updateStudentById from "@/lib/apiRoute/studentUpdater";
import { onlineBasicForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const getData = await request.json();
    const data = await onlineBasicForm.validate(getData);
    const findSchool = await prisma.school.count({
      where: { id: data.schoolId },
    });
    if (!findSchool) throw new RouteExceptionError("School not found");

    const findMajor = await prisma.major.count({ where: { id: data.majorId } });
    if (!findMajor) throw new RouteExceptionError("Major not found");

    const updating = await updateStudentById(url.params.id, {
      ...data,
      basicEdited: true,
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
