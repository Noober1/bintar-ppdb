import { prisma } from "@/lib/prisma";
import React from "react";
import EditAdminitrationPage from "./EditAdminitrationPage";
import { PageWithIdProps } from "@/types/components";
import { notFound } from "next/navigation";

const getAdministrationData = (id: string) =>
  prisma.administration.findUnique({
    where: { id },
  });

export type AdministrationDataForEdit = Awaited<
  ReturnType<typeof getAdministrationData>
>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getAdministrationData(props.params.id);
    if (!getData) throw getData;
    return <EditAdminitrationPage data={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
