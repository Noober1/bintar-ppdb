import { onlineBasicForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const GET: CrudRequestHandler = async (request, url) => {
  const getStudent = await prisma.student.findUnique({
    where: {
      id: parseInt(url.params.id),
    },
  });
  if (!getStudent) throw new RouteExceptionError("User not found", 404);

  return NextResponse.json({
    firstName: getStudent.firstName,
    lastName: getStudent.lastName,
    fullName: getStudent.firstName + " " + getStudent.lastName,
    profileComplete: {
      // basic: getStudent.basi == "Y",
      // number: getStudent.number_edited == "Y",
      // advanced: getStudent.advanced_edited == "Y",
      // address: getStudent.address_edited == "Y",
      // additional: getStudent.additional_edited == "Y",
      // parent: getStudent.parent_edited == "Y"
      basic: "Y",
      number: "Y",
      advanced: "Y",
      address: "Y",
      additional: "Y",
      parent: "Y",
    },
  });
};

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

    const updating = await prisma.student.update({
      data,
      where: {
        id: parseInt(url.params.id),
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
