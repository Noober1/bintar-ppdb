"use client";
import React, { memo, forwardRef } from "react";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// eslint-disable-next-line react/display-name
const CustomSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message, variant, id }, forwardedRef) => {
    const { closeSnackbar } = useSnackbar();

    return (
      <SnackbarContent ref={forwardedRef}>
        <Alert
          severity={variant == "default" ? "info" : variant}
          style={{ width: "100%" }}
        >
          <div className="pr-6">{message}</div>
          <IconButton
            onClick={() => closeSnackbar(id)}
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <CloseIcon color="inherit" />
          </IconButton>
        </Alert>
      </SnackbarContent>
    );
  }
);

export default memo(CustomSnackbar);
