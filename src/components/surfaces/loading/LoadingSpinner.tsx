import LoadingLogo from "@/components/feedbacks/LoadingLogo";
import Typography from "@mui/material/Typography";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <LoadingLogo />
      <Typography textAlign="center" sx={{ marginTop: "20px" }}>
        Memproses
      </Typography>
    </div>
  );
};

export default LoadingSpinner;
