"use client";

import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { FC, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordTextFieldProps
  extends Omit<TextFieldProps<"outlined">, "variant"> {
  variant?: "outlined";
}

const PasswordTextField: FC<PasswordTextFieldProps> = ({
  type,
  InputProps,
  variant,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={() => setshowPassword(!showPassword)}
            sx={{
              cursor: "pointer",
            }}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default PasswordTextField;
