import { redirect } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV === "production") return redirect("/");

  return children;
};

export default Layout;
