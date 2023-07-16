import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import UserEditPage from "./EditUserPage";
import { PageWithIdProps } from "@/types/components";

const getUserQuery = async (id: number) => {
  return await prisma.user.findFirst({
    select: {
      id: true,
      email: true,
      fullname: true,
      grantedAccess: true,
    },
    where: {
      id,
    },
  });
};

export type GetUserQueryForEdit = Awaited<ReturnType<typeof getUserQuery>>;

const Page = async (props: PageWithIdProps) => {
  try {
    const getData = await getUserQuery(parseInt(props.params.id));
    if (!getData) throw getData;
    return <UserEditPage userData={getData} />;
  } catch (error) {
    return notFound();
  }
};

export default Page;
