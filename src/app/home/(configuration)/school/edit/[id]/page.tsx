import { redirect } from "next/navigation";
import React from "react";
import EditSchoolPage from "./EditSchoolPage";
import { PageWithIdProps } from "@/types/components";
import { prisma } from "@/lib/prisma";

const getSchoolById = async (id: number | string) =>
  prisma.school.findUnique({
    where: { id: typeof id === "string" ? parseInt(id) : id },
  });

export type SchoolDataForEdit = Awaited<ReturnType<typeof getSchoolById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getSchoolById(props.params.id);
    if (!getData) throw getData;
    return <EditSchoolPage data={getData} />;
  } catch (error) {
    return redirect("/home/school");
  }
};

export default Page;
