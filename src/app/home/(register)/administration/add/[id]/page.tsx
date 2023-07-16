import React from "react";
import AddAdministrationPage from "./AddAdministrationPage";
import { prisma } from "@/lib/prisma";
import { PageWithIdProps } from "@/types/components";
import { redirect } from "next/navigation";

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

const Page = async (props: PageWithIdProps) => {
  try {
    const getStudentData = await findStudent(parseInt(props.params.id));
    if (!getStudentData) throw getStudentData;
    return <AddAdministrationPage studentData={getStudentData} />;
  } catch (error) {
    return redirect("/home/student");
  }
};

export default Page;
