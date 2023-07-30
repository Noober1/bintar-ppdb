import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginForm } from "./formSchemas";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "PSB",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email anda" },
        password: { label: "Kata sandi", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const validatedData = await loginForm.validate(credentials);

          const findUser = await prisma.user.findUnique({
            where: {
              email: validatedData.email,
            },
          });
          if (!findUser) throw new Error("User not found");

          const comparePassword = await bcrypt.compare(
            validatedData.password,
            findUser.password
          );
          if (!comparePassword) throw new Error("Password didn't match");

          return {
            id: findUser.id,
            email: findUser.email,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = parseInt(token.sub || "");
        session.user.email = token.email || "";
      }
      return session;
    },
  },
  pages: {
    signIn: process.env.NEXTAUTH_URL + "/login",
    signOut: process.env.NEXTAUTH_URL + "/logout",
  },
};

export default authOptions;
