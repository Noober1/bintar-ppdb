"use client";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Paper>
        <div className="w-screen max-w-screen-sm p-4 text-center">
          <Divider>
            <Typography variant="h4">Error</Typography>
          </Divider>
          <Typography align="center" gutterBottom>
            {error.message}
          </Typography>
          <Button onClick={() => reset()} variant="contained">
            Refresh halaman
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ErrorPage;
