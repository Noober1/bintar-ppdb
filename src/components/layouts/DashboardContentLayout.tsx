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
        gutterBottom
        variant={downSm ? "h5" : "h4"}
        textAlign={downSm ? "center" : "left"}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Box className="py-2">{children}</Box>
    </Stack>
  );
};

export default DashboardContentLayout;
