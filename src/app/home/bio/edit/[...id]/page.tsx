import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditBioPage from "./EditBioPage";

const getDataById = (id: number) =>
  prisma.student.findUnique({
    where: { id },
  });

export type BioDataForEdit = Awaited<ReturnType<typeof getDataById>>;

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  try {
    const getId = parseInt(id);
    const getData = await getDataById(getId);
    if (!getData) throw new Error("Data tidak ditemukan");
    return <EditBioPage data={getData} />;
  } catch (error) {
    return redirect("/home/kesiswaan");
  }
};

export default Page;
