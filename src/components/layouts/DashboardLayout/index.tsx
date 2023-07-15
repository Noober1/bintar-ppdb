"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import SideNav from "@/components/layouts/DashboardLayout/Sidenav";
import TopNav from "@/components/layouts/DashboardLayout/TopNav";
import { Paper } from "@mui/material";

const LayoutRoot = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: 5,
  paddingTop: 10,
  [theme.breakpoints.up("md")]: {
    padding: 10,
  },
  [theme.breakpoints.up("lg")]: {
    padding: 15,
    paddingLeft: 295,
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
    <div className="h-screen flex flex-col">
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav
        userData={userData}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot elevation={0} className="w-full flex-1">
        {children}
      </LayoutRoot>
    </div>
  );
};

export default DashboardLayout;
