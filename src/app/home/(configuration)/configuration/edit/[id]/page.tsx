import React from "react";
import { prisma } from "@/lib/prisma";
import { PageWithIdProps } from "@/types/components";
import { redirect } from "next/navigation";
import EditConfigurationPage from "./EditConfigurationPage";

const getConfigById = (id: number) =>
  prisma.config.findUnique({
    where: { id },
  });

export type ConfigDataForEdit = Awaited<ReturnType<typeof getConfigById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getConfigById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditConfigurationPage data={getData} />;
  } catch (error) {
    return redirect("/home/configuration");
  }
};

export default Page;
