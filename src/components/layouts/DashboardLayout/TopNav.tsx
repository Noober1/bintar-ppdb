"use client";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@/hooks/useMediaQuery";
import useLogoutDialog from "@/hooks/LogoutDialog";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

const SIDE_NAV_WIDTH = 280;

type TTopNavProps = {
  onNavOpen: () => void;
};

const TopNav = ({ onNavOpen }: TTopNavProps) => {
  const lgUp = useMediaQuery((query) => query.up("lg"));
  const mdDown = useMediaQuery((query) => query.down("sm"));
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
        <Toolbar variant={mdDown ? "dense" : "regular"}>
          {!lgUp && (
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
          )}
          <Typography
            className="flex-1"
            variant={mdDown ? "body1" : "h5"}
            textAlign={mdDown ? "center" : "left"}
            fontWeight="bold"
          >
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
