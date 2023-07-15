"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface DashboardContentLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardContentLayout = ({
  children,
  title,
}: DashboardContentLayoutProps) => {
  const downSm = useMediaQuery((query) => query.down("sm"));
  return (
    <Stack>
      <Typography
        className="mt-2"
        gutterBottom
        variant={downSm ? "h5" : "h4"}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Box>{children}</Box>
    </Stack>
  );
};

export default DashboardContentLayout;
