import React from "react";
import AdministrationDetailPage from "./AdministrationDetailPage";
import { prisma } from "@/lib/prisma";
import { PageWithIdProps } from "@/types/components";
import { notFound } from "next/navigation";

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

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await findStudentQuery(parseInt(props.params.id));
    if (!getData) throw getData;
    return <AdministrationDetailPage data={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
