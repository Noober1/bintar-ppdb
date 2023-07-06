"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import SideNav from "@/components/layouts/DashboardLayout/Sidenav";
import TopNav from "@/components/layouts/DashboardLayout/TopNav";

const SIDE_NAV_WIDTH = 290;

const LayoutRoot = styled("main")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

export type TDashboardLayout = {
  children: React.ReactNode;
  userData?: {
    id?: number;
    email?: string;
    fullname?: string;
    grantedAccess: string;
  };
};

const DashboardLayout = ({ children, userData }: TDashboardLayout) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        userData={userData}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <div className="flex flex-1 flex-col w-full p-2 lg:p-4">{children}</div>
      </LayoutRoot>
    </>
  );
};

export default DashboardLayout;
