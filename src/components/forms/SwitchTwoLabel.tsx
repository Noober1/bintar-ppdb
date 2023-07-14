"use client";
import React from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface SwitchTwoLabelProps extends SwitchProps {
  falseLabel?: string;
  trueLabel?: string;
  label: string;
}

const SwitchTwoLabel = ({
  falseLabel = "Tidak",
  trueLabel = "Ya",
  label,
  ...props
}: SwitchTwoLabelProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{falseLabel}</Typography>
        <Switch {...props} />
        <Typography>{trueLabel}</Typography>
      </Stack>
    </FormControl>
  );
};

export default SwitchTwoLabel;
