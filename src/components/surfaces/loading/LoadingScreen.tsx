"use client";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

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
      <Typography variant="h4" gutterBottom>
        Memuat
      </Typography>
      <div className="max-w-sm md:max-w-md w-full">
        <LinearProgress className="h-2" />
      </div>
    </Box>
  );
};

export default LoadingScreen;
