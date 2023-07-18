"use client";
import React, { Fragment } from "react";
import { StyledList, StyledListSubheader } from "./SidenavItem";
import useMediaQuery from "@/hooks/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const SidenavLoading = () => {
  const lgUp = useMediaQuery((query) => query.up("lg"));
  return (
    <StyledList component="nav" disablePadding>
      {[...new Array(3)].map((value, index) => (
        <Fragment key={index}>
          <StyledListSubheader
            className="uppercase"
            disableGutters
            sx={{
              textAlign: lgUp ? "left" : "center",
            }}
          >
            <Skeleton width="75%" />
          </StyledListSubheader>
          <ListItemButton className="rounded-lg" disableGutters>
            <ListItemIcon>
              <Skeleton width={20} variant="rectangular" />
            </ListItemIcon>
            <ListItemText primary={<Skeleton />} />
          </ListItemButton>
          <ListItemButton className="rounded-lg" disableGutters>
            <ListItemIcon>
              <Skeleton width={20} variant="rectangular" />
            </ListItemIcon>
            <ListItemText primary={<Skeleton />} />
          </ListItemButton>
        </Fragment>
      ))}
    </StyledList>
  );
};

export default SidenavLoading;
