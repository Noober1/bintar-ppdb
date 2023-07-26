"use client";
import LoadingLogo from "@/components/feedbacks/LoadingLogo";
import { alpha } from "@mui/material";
import Paper from "@mui/material/Paper";
import React from "react";

const TableLoadingOverlay = () => {
  return (
    <Paper
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.7),
      }}
      className="w-full h-full flex items-center justify-center rounded-none"
    >
      <LoadingLogo />
    </Paper>
  );
};

export default TableLoadingOverlay;
