import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditMeasurePage from "./EditMeasurePage";

const getDataById = (id: number) =>
  prisma.student.findUnique({
    select: {
      id: true,
      firstName: true,
      registrationNumber: true,
      lastName: true,
      formerSchool: {
        select: {
          name: true,
        },
      },
      gymUniformSize: true,
      primaryUniformSize: true,
      secondaryUniformSize: true,
      shoeSize: true,
    },
    where: { id },
  });

export type MeasureDataForEdit = Awaited<ReturnType<typeof getDataById>>;

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const getId = parseInt(id);
    const getData = await getDataById(getId);
    if (!getData) throw new Error("Data tidak ditemukan");
    return <EditMeasurePage data={getData} />;
  } catch (error) {
    return redirect("/home/kesiswaan");
  }
};

export default Page;
