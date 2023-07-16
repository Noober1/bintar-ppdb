import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import EditMeasurePage from "./EditMeasurePage";
import { PageWithIdProps } from "@/types/components";

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

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getDataById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditMeasurePage data={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
