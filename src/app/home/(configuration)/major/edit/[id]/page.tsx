import React from "react";
import EditMajorPage from "./EditMajorPage";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PageWithIdProps } from "@/types/components";

const getMajorById = (id: number) =>
  prisma.major.findUnique({
    where: { id },
  });

export type MajorDataForEdit = Awaited<ReturnType<typeof getMajorById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getMajorById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditMajorPage data={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
