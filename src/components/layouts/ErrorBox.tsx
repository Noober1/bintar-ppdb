"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";

interface ErrorBoxProps {
  message: React.ReactNode;
}

const ErrorBox = ({ message }: ErrorBoxProps) => {
  const handleRefresh = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  return (
    <div className="w-screen max-w-screen-sm text-center mt-4 lg:mx-auto">
      <Paper className="p-4">
        <Divider>
          <Typography variant="h4" gutterBottom>
            Masalah ditemukan
          </Typography>
        </Divider>
        <Alert severity="error" className="mb-4">
          {message}
        </Alert>
        <Button onClick={handleRefresh} variant="contained">
          Refresh halaman
        </Button>
      </Paper>
    </div>
  );
};

export default ErrorBox;
