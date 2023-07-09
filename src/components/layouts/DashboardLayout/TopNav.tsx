"use client";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import useMediaQuery from "@/hooks/useMediaQuery";
import { alpha } from "@mui/material/styles";
import useLogoutDialog from "@/hooks/LogoutDialog";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

type TTopNavProps = {
  onNavOpen: () => void;
};

const TopNav = ({ onNavOpen }: TTopNavProps) => {
  const lgUp = useMediaQuery((query) => query.up("lg"));
  const handleLogout = useLogoutDialog();

  return (
    <>
      <AppBar
        color="primary"
        elevation={0}
        component="header"
        position="sticky"
        sx={{
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Tooltip
            title={
              <TooltipTitle
                title="Menu"
                content="Click untuk membuka menu bilah sisi."
              />
            }
          >
            <IconButton
              onClick={onNavOpen}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography className="flex-1" variant="h5" fontWeight="bold">
            Aplikasi PSB
          </Typography>
          <Tooltip
            title={<TooltipTitle title="Logout" content="Click untuk logout" />}
          >
            <IconButton onClick={handleLogout} size="large" color="inherit">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNav;
