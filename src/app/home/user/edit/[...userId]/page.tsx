import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import UserEditPage from "./EditUserPage";

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

const Page = async (props: {
  params: {
    userId: string;
  };
}) => {
  const getData = await getUserQuery(parseInt(props.params.userId));
  if (!getData) {
    redirect("/home/user");
  }

  return <UserEditPage userData={getData} />;
};

export default Page;
