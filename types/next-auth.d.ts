import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
    };
  }
  interface User {
    id: number;
    email: string;
  }
  interface JWT {
    id: number;
    email: number;
  }
}
