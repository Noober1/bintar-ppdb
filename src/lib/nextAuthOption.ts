import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "PSB",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email anda" },
        password: { label: "Kata sandi", type: "password" },
      },
      async authorize(credentials, req) {
        const findUser = await prisma.user.findFirst({
          select: {
            id: true,
            email: true,
            password: true,
          },
          where: {
            email: credentials?.email,
          },
        });

        if (!findUser) return null;
        if (!bcrypt.compareSync(credentials?.password || "", findUser.password))
          return null;

        return {
          id: findUser.id as unknown as string,
          email: findUser.email,
        };
      },
    }),
  ],
  pages: {
    signIn: process.env.NEXTAUTH_URL + "/login",
    signOut: process.env.NEXTAUTH_URL + "/logout",
  },
};

export default authOptions;
