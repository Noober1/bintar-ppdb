import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditKesiswaanPage from "./EditKesiswaanPage";

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

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const getId = parseInt(id);
    const getData = await getDataById(getId);
    if (!getData) throw new Error("Data tidak ditemukan");
    return <EditKesiswaanPage data={getData} />;
  } catch (error) {
    return redirect("/home/kesiswaan");
  }
};

export default Page;
