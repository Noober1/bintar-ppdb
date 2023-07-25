"use client";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@/hooks/useMediaQuery";
import useLogoutDialog from "@/hooks/LogoutDialog";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SIDEBAR_WIDTH } from ".";
import ProfileIcon from "@/components/buttons/ProfileIcon";
import { UserDataResponse } from "@/app/api/user/route";
import { Skeleton } from "@mui/material";

type TTopNavProps = {
  onNavOpen: () => void;
  userData?: UserDataResponse;
  loading?: boolean;
};

const LoadingIconButton = () => (
  <IconButton>
    <Skeleton variant="circular" className="aspect-square" />
  </IconButton>
);

const TopNav = ({ onNavOpen, loading, userData }: TTopNavProps) => {
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
            lg: `${SIDEBAR_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDEBAR_WIDTH}px)`,
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
          <Box>
            {loading ? (
              <LoadingIconButton />
            ) : (
              <ProfileIcon userName={userData?.fullname} />
            )}
            {loading ? (
              <LoadingIconButton />
            ) : !mdDown ? (
              <Tooltip
                title={
                  <TooltipTitle title="Logout" content="Click untuk logout" />
                }
              >
                <IconButton onClick={handleLogout} size="large" color="inherit">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopNav;
