"use client";
import { IconButton } from "@mui/material";
import { SnackbarKey, useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const CloseSnackbarButton = ({
  snackbarKey,
}: {
  snackbarKey?: SnackbarKey;
}) => {
  const { closeSnackbar } = useSnackbar();
  const handleClose = () => {
    closeSnackbar(snackbarKey);
  };
  return (
    <IconButton onClick={handleClose}>
      <CloseIcon color="inherit" />
    </IconButton>
  );
};

export default CloseSnackbarButton;
