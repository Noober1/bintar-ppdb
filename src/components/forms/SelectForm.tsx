"use client";

import { FormSelectTypeFormat } from "@/types/forms";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import React, { FC } from "react";

interface SelectFormProps extends SelectProps {
  options: FormSelectTypeFormat<any>[];
  helperText: string;
}

const SelectForm: FC<SelectFormProps> = ({ options, helperText, ...props }) => {
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props}>
        {options.map((value) => (
          <MenuItem
            key={value.name}
            value={value.name}
            selected={props.value === value.name}
          >
            {value.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectForm;
