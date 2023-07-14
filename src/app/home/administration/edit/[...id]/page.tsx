import { prisma } from "@/lib/prisma";
import React from "react";
import EditAdminitrationPage from "./EditAdminitrationPage";

const getAdministrationData = (id: string) =>
  prisma.administration.findUnique({
    where: { id },
  });

export type AdministrationDataForEdit = Awaited<
  ReturnType<typeof getAdministrationData>
>;

interface EditAdministrationPageProps {
  params: {
    id: string[];
  };
}

const Page = async ({ params: { id } }: EditAdministrationPageProps) => {
  const getData = await getAdministrationData(id[0]);
  if (!getData) {
    throw new Error("Data administrasi tidak ditemukan.");
  }

  return <EditAdminitrationPage data={getData} />;
};

export default Page;
