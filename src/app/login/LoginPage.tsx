"use client";

import LoginBox from "@/components/forms/LoginBox";
import Paper from "@mui/material/Paper";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Paper
        variant="outlined"
        className="w-full h-full flex items-center justify-center md:block md:h-auto md:max-w-md"
      >
        <LoginBox />
      </Paper>
    </div>
  );
};

export default LoginPage;
