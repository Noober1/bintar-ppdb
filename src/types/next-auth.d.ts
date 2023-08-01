import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User {
    id: number;
    email: string;
  }
}
