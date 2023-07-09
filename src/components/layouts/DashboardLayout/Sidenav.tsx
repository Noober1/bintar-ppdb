"use client";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SideNavItem from "@/components/layouts/DashboardLayout/SidenavItem";
import { Logo } from "@/components/Logo";
import { TDashboardLayout } from "@/components/layouts/DashboardLayout";
import useMediaQuery from "@/hooks/useMediaQuery";

type TSideNavProps = {
  onClose: () => void;
  open: boolean;
  userData: TDashboardLayout["userData"];
};

const SideNav = ({ open, onClose, userData }: TSideNavProps) => {
  const lgUp = useMediaQuery((query) => query.up("lg"));
  const downSm = useMediaQuery((query) => query.down("sm"));

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: downSm ? "100vw" : 280,
          height: "100%",
        }}
      >
        <Box className="flex flex-row items-center p-2">
          <Box
            component={NextLink}
            href="/"
            className="aspect-square h-20 px-4"
          >
            <Logo />
          </Box>
          <div className="flex-1">
            <Typography variant="subtitle1">{userData?.fullname}</Typography>
            <Typography variant="body2">SMK Bina Taruna</Typography>
          </div>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box component="nav" className="flex-1 p-3">
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            <SideNavItem />
          </Stack>
        </Box>
      </Box>
    </>
  );

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
      {content}
    </Drawer>
  );
};

export default SideNav;
