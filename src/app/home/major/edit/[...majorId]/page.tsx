import React from "react";
import EditMajorPage from "./EditMajorPage";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const getMajorById = (id: number) =>
  prisma.major.findUnique({
    where: { id },
  });

export type MajorDataForEdit = Awaited<ReturnType<typeof getMajorById>>;

const Page = async (props: {
  params: {
    majorId: string;
  };
}) => {
  try {
    const getId = parseInt(props.params.majorId);
    const getData = await getMajorById(getId);
    if (!getData) throw new Error("Data tidak ditemukan");
    return <EditMajorPage data={getData} />;
  } catch (error) {
    return redirect("/home/major");
  }
};

export default Page;
