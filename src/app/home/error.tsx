"use client";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import Alert from "@mui/material/Alert";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-screen max-w-screen-sm text-center mt-4">
      <Paper className="p-4">
        <Divider>
          <Typography variant="h4" gutterBottom>
            Masalah ditemukan
          </Typography>
        </Divider>
        <Alert severity="error" className="mb-4">
          {error.message}
        </Alert>
        <Button onClick={() => reset()} variant="contained">
          Refresh halaman
        </Button>
      </Paper>
    </div>
  );
};

export default ErrorPage;
