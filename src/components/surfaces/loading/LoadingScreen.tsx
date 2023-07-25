"use client";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";
import LoadingSpinner from "@/components/surfaces/loading/LoadingSpinner";

const LoadingScreen = () => {
  return (
    <Box
      className="fixed inset-0 flex flex-col items-center justify-center"
      role="presentation"
      sx={{
        zIndex: 2000,
      }}
      component={Paper}
    >
      <LoadingSpinner label="Memuat" />
    </Box>
  );
};

export default LoadingScreen;
