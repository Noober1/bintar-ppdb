"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React from "react";

const Snackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    enqueueSnackbar("Test");
  };
  return (
    <>
      <Typography>Snackbar test</Typography>
      <Button onClick={handleClick}>Snackbar Test</Button>
    </>
  );
};

export default Snackbar;
