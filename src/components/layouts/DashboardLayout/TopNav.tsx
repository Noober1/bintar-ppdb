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

const SIDE_NAV_WIDTH = 290;
const TOP_NAV_HEIGHT = 64;

type TTopNavProps = {
  onNavOpen: () => void;
};

const TopNav = ({ onNavOpen }: TTopNavProps) => {
  const lgUp = useMediaQuery((query) => query.up("lg"));
  const handleLogout = useLogoutDialog();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
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
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <Tooltip
                title={
                  <TooltipTitle
                    title="Menu"
                    content="Click untuk membuka menu bilah sisi."
                  />
                }
              >
                <IconButton onClick={onNavOpen}>
                  <SvgIcon fontSize="small">
                    <MenuIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip
              title={
                <TooltipTitle title="Logout" content="Click untuk logout" />
              }
            >
              <IconButton onClick={handleLogout}>
                <SvgIcon fontSize="small">
                  <LogoutIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default TopNav;
