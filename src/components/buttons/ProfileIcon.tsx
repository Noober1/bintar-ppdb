"use client";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect } from "react";
import useLogoutDialog from "@/hooks/LogoutDialog";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import { useRouter, usePathname } from "next/navigation";

const ProfileIcon = ({ userName }: { userName?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = useLogoutDialog();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <>
      <Tooltip
        title={
          <TooltipTitle title="Profile" content="Click untuk melihat menu" />
        }
      >
        <IconButton
          id="profile-icon"
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="large"
          color="inherit"
        >
          <Icon />
        </IconButton>
      </Tooltip>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-icon",
        }}
      >
        {userName && <MenuItem disabled>{userName}</MenuItem>}
        <MenuItem onClick={() => router.push("/home/setting")}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Pengaturan</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileIcon;
