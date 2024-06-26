"use client";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SideNavItem from "@/components/layouts/DashboardLayout/SidenavItem";
import { Logo } from "@/components/Logo";
import { SIDEBAR_WIDTH } from "@/components/layouts/DashboardLayout";
import useMediaQuery from "@/hooks/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import SidenavLoading from "./SidenavLoading";
import { UserDataResponse } from "@/app/api/user/route";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Link from "next/link";

type SideNavProps = {
  onClose: () => void;
  open: boolean;
  userData?: UserDataResponse;
  loading?: boolean;
};

const Credit = styled(Paper)(() => ({
  marginTop: 5,
  padding: 3,
}));

const SideNav = ({
  open,
  onClose,
  userData,
  loading: isLoading,
}: SideNavProps) => {
  const lgUp = useMediaQuery((query) => query.up("lg"));

  return (
    <Drawer
      anchor={lgUp ? "left" : undefined}
      open={lgUp ? true : open}
      variant={lgUp ? "permanent" : "temporary"}
      onClose={!lgUp ? onClose : undefined}
      sx={{
        zIndex: (theme) => (!lgUp ? theme.zIndex.appBar + 100 : undefined),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: SIDEBAR_WIDTH,
          height: "100%",
        }}
      >
        <Box className="flex flex-row items-center p-2">
          <Box
            component={NextLink}
            href="/"
            className="aspect-square h-20 px-4"
          >
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={50}
                sx={{ marginTop: 2 }}
              />
            ) : (
              <Logo />
            )}
          </Box>
          <div className="flex-1 overflow-hidden">
            <Typography
              variant="subtitle1"
              className="overflow-hidden text-ellipsis whitespace-nowrap capitalize"
            >
              {isLoading ? <Skeleton width="75%" /> : userData?.fullname}
            </Typography>
            <Typography variant="body2">
              {isLoading ? <Skeleton /> : "SMK Bina Taruna"}
            </Typography>
          </div>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          className="flex-1"
          sx={(theme) => ({
            paddingTop: "10px",
            [theme.breakpoints.up("lg")]: {
              padding: "10px",
            },
          })}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {isLoading || !userData ? (
              <SidenavLoading />
            ) : (
              <SideNavItem
                isAdmin={userData.type === "ADMINISTRATOR"}
                access={userData.grantedAccess}
              />
            )}
          </Stack>
          <Credit>
            &copy;
            {new Date().getFullYear()} -{" "}
            <strong>SMK Bina Taruna Jalancagak</strong> - Version 1.0.2 <br />
            Created by{" "}
            <Link href={`https://fb.me/ruhiyatna.cucu`} target="_blank">
              Cucu Ruhiyatna
            </Link>
          </Credit>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideNav;
