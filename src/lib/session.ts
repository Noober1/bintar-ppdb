import { getServerSession as getSession } from "next-auth/next";
import authOptions from "@/lib/nextAuthOption";
import { redirect } from "next/navigation";

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
