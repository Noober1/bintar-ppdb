import React from "react";
import EditAnnouncementPage from "./EditAnnouncementPage";
import { prisma } from "@/lib/prisma";
import { PageWithIdProps } from "@/types/components";
import { redirect } from "next/navigation";

const getDataQuery = (id: number) =>
  prisma.announcement.findUnique({ where: { id } });

export type AnnouncementDataForEdit = Awaited<ReturnType<typeof getDataQuery>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const id = parseInt(props.params.id);
    const getData = await getDataQuery(id);
    if (!getData) throw getData;
    return <EditAnnouncementPage data={getData} />;
  } catch (error) {
    return redirect("/home/announcement");
  }
};

export default Page;
