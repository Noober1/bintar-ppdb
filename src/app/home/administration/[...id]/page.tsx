import React from "react";
import AdministrationDetailPage from "./AdministrationDetailPage";
import { prisma } from "@/lib/prisma";

const findStudentQuery = (id: number) =>
  prisma.student.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      registrationNumber: true,
      firstName: true,
      lastName: true,
      formerSchool: {
        select: {
          name: true,
        },
      },
      isRegistered: true,
    },
  });

export type StudentData = Awaited<ReturnType<typeof findStudentQuery>>;

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const userId = parseInt(id);
    const getData = await findStudentQuery(userId);
    return <AdministrationDetailPage data={getData} />;
  } catch (error) {
    throw new Error("Siswa tidak ditemukan");
  }
};

export default Page;
