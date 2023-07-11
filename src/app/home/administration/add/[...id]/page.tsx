import React from "react";
import AddAdministrationPage from "./AddAdministrationPage";
import { prisma } from "@/lib/prisma";

const findStudent = (id: number) =>
  prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      formerSchool: {
        select: {
          name: true,
        },
      },
    },
  });

export type StudentData = Awaited<ReturnType<typeof findStudent>>;

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const studentId = parseInt(id);
  if (isNaN(studentId)) {
    throw new Error("ID siswa tidak ditemukan");
  }
  const getStudentData = await findStudent(studentId);
  if (!getStudentData) {
    throw new Error("Siswa tidak ditemukan");
  }
  return <AddAdministrationPage studentData={getStudentData} />;
};

export default Page;
