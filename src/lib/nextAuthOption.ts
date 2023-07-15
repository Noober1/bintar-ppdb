import { NextAuthOptions } from "next-auth";
import CredentialsProvider, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginForm } from "./formSchemas";

const authLogic: CredentialsConfig["authorize"] = async (credentials) => {
  const validatedData = await loginForm.validate(credentials);
  const findUser = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (!findUser) return null;
  if (!bcrypt.compareSync(validatedData.password || "", findUser.password))
    return null;

  return {
    id: findUser.id,
    email: findUser.email,
  };
};

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "PSB",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email anda" },
        password: { label: "Kata sandi", type: "password" },
      },
      authorize: authLogic,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = parseInt(token.sub || "0");
      return session;
    },
  },
  pages: {
    signIn: process.env.NEXTAUTH_URL + "/login",
    signOut: process.env.NEXTAUTH_URL + "/logout",
  },
};

export default authOptions;
