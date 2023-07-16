import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditKesiswaanPage from "./EditKesiswaanPage";
import { PageWithIdProps } from "@/types/components";

const getDataById = (id: number) =>
  prisma.student.findUnique({
    select: {
      id: true,
      firstName: true,
      registrationNumber: true,
      lastName: true,
      parentPhoneNumber: true,
      address: true,
      extracurricular: true,
      height: true,
      weight: true,
      relapsingIllness: true,
      seriousIllness: true,
      haveSkipLesson: true,
      haveTruancy: true,
      haveDrunked: true,
      haveFought: true,
      haveJoinedCriminalGang: true,
      haveWatchedPorn: true,
      haveADate: true,
      haveTattoo: true,
      isSmoker: true,
      isPierced: true,
      isDrug: true,
      isIlliterate: true,
    },
    where: { id },
  });

export type KesiswaanDataForEdit = Awaited<ReturnType<typeof getDataById>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getDataById(parseInt(props.params.id));
    if (!getData) throw getData;
    return <EditKesiswaanPage data={getData} />;
  } catch (error) {
    return redirect("/home/kesiswaan");
  }
};

export default Page;
