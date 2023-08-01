import { prisma } from "@/lib/prisma";
import { RouteExceptionError } from "@/lib/routeUtils";
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
      basic: getStudent.basicEdited,
      number: getStudent.numberEdited,
      advanced: getStudent.advanceEdited,
      additional: getStudent.additionalEdited,
      parent: getStudent.parentEdited,
    },
  });
};
