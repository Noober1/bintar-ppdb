"use client";
import LoadingLogo from "@/components/feedbacks/LoadingLogo";
import Typography from "@mui/material/Typography";
import React from "react";

const LoadingSpinner = ({ label = "Memproses" }: { label?: string }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <LoadingLogo />
      <Typography textAlign="center" sx={{ marginTop: "20px" }}>
        {label}
      </Typography>
    </div>
  );
};

export default LoadingSpinner;
