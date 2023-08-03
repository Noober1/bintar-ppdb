import { getServerSession as getSession } from "next-auth/next";
import authOptions from "@/lib/nextAuthOption";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { ROLES } from "@/constants/roles";
import { USER_TYPES } from "@prisma/client";

export const getServerSession = () => getSession(authOptions);
export const getSessionUser = async () => {
  const session = await getServerSession();
  return session ? session.user : null;
};
export const getSessionUserOrRedirect = async () => {
  const session = await getServerSession();
  if (!session) {
    return redirect("/login");
  }
  return session.user;
};

interface SessionUserRole {
  type: USER_TYPES;
  roles: ROLES[];
}

export const getSessionUserRoles =
  async (): Promise<SessionUserRole | null> => {
    const session = await getServerSession();
    if (!session) return null;

    const getUserdata = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { grantedAccess: true, type: true },
    });
    if (!getUserdata) return null;
    return {
      roles: Array.isArray(getUserdata.grantedAccess)
        ? (getUserdata.grantedAccess as ROLES[])
        : typeof getUserdata.grantedAccess === "string"
        ? JSON.parse(getUserdata.grantedAccess)
        : [],
      type: getUserdata.type || "USER",
    };
  };

export const withRoleOrRedirect = async (
  roles: ROLES,
  url: string = "/home"
) => {
  const getRoles = await getSessionUserRoles();
  // if user type is ADMINISTRATOR, all access is granted
  if (getRoles?.type == "ADMINISTRATOR") return;
  // if getRoles type is not array, redirect
  if (!Array.isArray(getRoles?.roles)) return redirect(url);
  // if roles don't have required role
  if (!getRoles?.roles.includes(roles)) return redirect(url);
  // else, all is clear
};
