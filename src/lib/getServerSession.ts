import { getServerSession as getSession } from "next-auth/next";
import authOptions from "@/lib/nextAuthOption";

const getServerSession = () => getSession(authOptions);

export default getServerSession;
