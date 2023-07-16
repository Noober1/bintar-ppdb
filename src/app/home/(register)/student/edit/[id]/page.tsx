import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditStudentPage from "./EditStudentPage";
import { PageWithIdProps } from "@/types/components";

const getDataById = (id: number) =>
  prisma.student.findUnique({
    select: {
      id: true,
      firstName: true,
      registrationNumber: true,
      lastName: true,
      phoneNumber: true,
      email: true,
      birthplace: true,
      birthdate: true,
      gender: true,
      NISNNumber: true,
      schoolId: true,
      schoolGraduateYear: true,
      majorId: true,
    },
    where: { id },
  });

export type StudentDataForEdit = Awaited<ReturnType<typeof getDataById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getDataById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditStudentPage data={getData} />;
  } catch (error) {
    return redirect("/home/student");
  }
};

export default Page;
