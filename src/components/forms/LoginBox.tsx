"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { loginForm } from "@/lib/formSchemas";
import LoadingLogo from "../feedbacks/LoadingLogo";
import { LoginForm } from "@/types/forms";
import useForm from "@/hooks/useForm";

const loginFormInitValue: LoginForm = {
  email: "",
  password: "",
};

const LoginBox = () => {
  const router = useRouter();
  const [alertMessage, setalertMessage] = useState<null | string>(null);
  const [showPasssword, setshowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    helperText,
    isError,
    values,
    isSubmitting,
  } = useForm({
    initialValues: loginFormInitValue,
    validationSchema: loginForm,
    onSubmit: (value, actions) => {
      actions.setSubmitting(true);
      setalertMessage(null);
      signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            setalertMessage("Login gagal: Email atau kata sandi salah");
            actions.setSubmitting(false);
          } else {
            router.push("/");
          }
        })
        .catch((error) => {
          setalertMessage(error.message || "Error tidak diketahui");
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="p-4 relative overflow-hidden">
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        SMK Bina Taruna Jalancagak
      </Typography>
      <Alert
        severity={alertMessage ? "error" : "info"}
        className="mb-4"
        variant="filled"
      >
        {alertMessage ?? "Silahkan login terlebih dahulu"}
      </Alert>
      <div className="grid grid-cols-1 gap-6 mb-4">
        <TextField
          name="email"
          error={isError("email")}
          value={values.email}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          helperText={helperText("email") ?? ""}
        />
        <TextField
          name="password"
          error={isError("email")}
          InputLabelProps={{
            shrink: true,
          }}
          value={values.password}
          type={showPasssword ? "text" : "password"}
          fullWidth
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          label="Kata sandi"
          helperText={helperText("password") ?? ""}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={() => setshowPassword(!showPasssword)}
                sx={{
                  cursor: "pointer",
                }}
              >
                {showPasssword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        type="submit"
        size="large"
        color="primary"
        variant="contained"
        className="font-bold rounded-full"
        fullWidth
      >
        Login
      </Button>
      {isSubmitting && (
        <>
          <Paper className="absolute inset-0 opacity-90 z-10"></Paper>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <LoadingLogo />
          </div>
        </>
      )}
    </form>
  );
};

export default LoginBox;
