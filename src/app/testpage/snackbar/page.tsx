"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import React from "react";

const buttons = ["default", "error", "success", "warning", "info"] as const;

const Page = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Stack direction="row">
      {buttons.map((value) => (
        <Button
          key={value}
          onClick={() => enqueueSnackbar("Snackbar", { variant: value })}
        >
          {value}
        </Button>
      ))}
    </Stack>
  );
};

export default Page;
