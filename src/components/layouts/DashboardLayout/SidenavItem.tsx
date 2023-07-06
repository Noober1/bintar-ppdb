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

const StyledList = styled(List)<{ component?: React.ElementType }>({
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
  "& .MuiListSubheader-root": {},
});

const StyledListSubheader = styled(ListSubheader)({
  lineHeight: 3,
  fontWeight: "bold",
});

const SideNavItem = () => {
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const joinedPathName = [splittedPathname[1], splittedPathname[2]].join("/");
  const newPathname = "/" + joinedPathName.replace(/\/$/, "");
  return (
    <StyledList component="nav" disablePadding>
      {items.map((item) => {
        const isActive = item.path ? newPathname === item.path : false;
        return item.isDivider ? (
          <StyledListSubheader
            classes={{
              root: "mt-4",
            }}
            key={item.title}
            className="uppercase"
            disableGutters
          >
            {item.title}
          </StyledListSubheader>
        ) : (
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
        );
      })}
    </StyledList>
  );
};

export default SideNavItem;
