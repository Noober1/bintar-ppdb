import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import EditSchoolPage from "./EditSchoolPage";
import { PageWithIdProps } from "@/types/components";

const getSchoolById = (id: number) =>
  prisma.school.findUnique({
    where: { id },
  });

export type SchoolDataForEdit = Awaited<ReturnType<typeof getSchoolById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getSchoolById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditSchoolPage data={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
