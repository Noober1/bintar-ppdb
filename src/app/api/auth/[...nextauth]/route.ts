import NextAuth from "next-auth";
import authOptions from "@/lib/nextAuthOption";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
