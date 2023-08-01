import { prisma } from "@/lib/prisma";
import { Student } from "@prisma/client";
import { RouteExceptionError } from "../routeUtils";

const updateStudentById = async (
  id: number | string,
  data: Partial<Student>
) => {
  const studentId = typeof id === "string" ? parseInt(id) : id;
  const getStudentById = await prisma.student.count({
    where: { id: studentId },
  });
  if (!getStudentById) {
    throw new RouteExceptionError("Student not found");
  }

  return prisma.student.update({
    data,
    where: { id: studentId },
  });
};

export default updateStudentById;
