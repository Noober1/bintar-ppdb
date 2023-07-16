import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import EditBioPage from "./EditBioPage";
import { PageWithIdProps } from "@/types/components";

const getDataById = (id: number) =>
  prisma.student.findUnique({
    where: { id },
  });

export type BioDataForEdit = Awaited<ReturnType<typeof getDataById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getDataById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditBioPage data={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
