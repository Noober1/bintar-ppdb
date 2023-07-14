"use client";
import { FormSelectTypeFormat } from "@/types/forms";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import React, { FC } from "react";

interface RowRadioGroupProps extends RadioGroupProps {
  label: string;
  helperText: string;
  options: FormSelectTypeFormat<any>[];
}

const RowRadioGroup: FC<RowRadioGroupProps> = ({
  label,
  options,
  children,
  helperText,
  row,
  ...props
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row {...props}>
        {options.map((value) => (
          <FormControlLabel
            key={value.name}
            value={value.name}
            control={<Radio />}
            label={value.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default RowRadioGroup;
