"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import SideNav from "@/components/layouts/DashboardLayout/Sidenav";
import TopNav from "@/components/layouts/DashboardLayout/TopNav";
import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { dataFetcher } from "@/lib/utils";
import { UserDataResponse } from "@/app/api/user/route";

export const SIDEBAR_WIDTH: number = 280;

const LayoutRoot = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: 5,
  paddingTop: 15,
  [theme.breakpoints.up("md")]: {
    paddingX: 10,
  },
  [theme.breakpoints.up("lg")]: {
    padding: 15,
    paddingLeft: 280 + 15,
  },
}));

export type DashboardLayoutProps = {
  children: React.ReactNode;
  userId?: number;
};

const DashboardLayout = ({ children, userId }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const { isLoading, data } = useQuery<UserDataResponse>({
    queryKey: ["user-data"],
    queryFn: ({ signal }) =>
      dataFetcher({
        url: "/api/user",
        signal,
      }),
    keepPreviousData: true,
    refetchInterval: 5000,
  });

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
      <TopNav
        onNavOpen={() => setOpenNav(true)}
        loading={isLoading}
        userData={data}
      />
      <SideNav
        userData={data}
        loading={isLoading}
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot elevation={0} className="w-full flex-1">
        {children}
      </LayoutRoot>
    </>
  );
};

export default DashboardLayout;
