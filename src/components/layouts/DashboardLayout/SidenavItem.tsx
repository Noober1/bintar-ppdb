"use client";
import NextLink from "next/link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/material/styles";

import items from "./SidenavItemList";
import { usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ROLES } from "@/constants/roles";

export const StyledList = styled(List)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    "& .MuiListItemButton-root": {
      paddingLeft: 5,
      paddingRight: 0,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 0,
      marginLeft: 6,
      marginRight: 10,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
    "& .MuiListSubheader-root": {
      [theme.breakpoints.up("sm")]: {
        marginTop: 10,
      },
    },
  })
);

export const StyledListSubheader = styled(ListSubheader)({
  lineHeight: 3,
  fontWeight: "bold",
});

interface SidenavItemProps {
  isAdmin?: boolean;
  access: ROLES[] | "all";
}

const SideNavItem = ({ access, isAdmin }: SidenavItemProps) => {
  const pathname = usePathname();
  const lgUp = useMediaQuery((query) => query.up("lg"));
  const splittedPathname = pathname.split("/");
  const joinedPathName = [splittedPathname[1], splittedPathname[2]].join("/");
  const newPathname = "/" + joinedPathName.replace(/\/$/, "");
  return (
    <StyledList component="nav" disablePadding>
      {items.map((item) => {
        // if item isn't a divider AND path is exist from item
        const isActive =
          !item.isDivider && item.path ? newPathname === item.path : false;
        return item.isDivider ? (
          <StyledListSubheader
            sx={{
              textAlign: lgUp ? "left" : "center",
            }}
            key={item.title}
            className="uppercase"
            disableGutters
          >
            {item.title}
          </StyledListSubheader>
        ) : // if user is admin or item role is true or item role included in user role, render it.
        isAdmin ||
          item.role === true ||
          (typeof item.role !== "boolean" && access.includes(item.role)) ? (
          <ListItemButton
            className="rounded-lg"
            LinkComponent={NextLink}
            href={item.path || ""}
            disableGutters
            key={item.title}
            sx={{
              ...(isActive && {
                color: (theme) => theme.palette.primary.main,
              }),
            }}
          >
            <ListItemIcon
              sx={{
                ...(isActive && {
                  color: (theme) => theme.palette.primary.main,
                }),
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ) : // if not, don't render menu
        null;
      })}
    </StyledList>
  );
};

export default SideNavItem;
