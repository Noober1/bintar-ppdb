import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditSchoolPage from "./EditSchoolPage";

const getSchoolById = (id: number) =>
  prisma.school.findUnique({
    where: { id },
  });

export type SchoolDataForEdit = Awaited<ReturnType<typeof getSchoolById>>;

const Page = async (props: {
  params: {
    schoolId: string;
  };
}) => {
  try {
    const getId = parseInt(props.params.schoolId);
    const getData = await getSchoolById(getId);
    if (!getData) throw new Error("Data tidak ditemukan");
    return <EditSchoolPage data={getData} />;
  } catch (error) {
    return redirect("/home/school");
  }
};

export default Page;
