"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik, FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { loginForm } from "@/lib/formSchemas";
import LoadingLogo from "../feedbacks/LoadingLogo";
import { alpha } from "@mui/material/styles";
import { HandleFormSubmit } from "@/types/route";
import { LoginForm } from "@/types/forms";

const loginFormInitValue: LoginForm = {
  email: "",
  password: "",
};

const LoginBox = () => {
  const router = useRouter();
  const [alertMessage, setalertMessage] = useState<null | string>(null);
  const [showPasssword, setshowPassword] = useState<boolean>(false);

  const submitForm: HandleFormSubmit<LoginForm> = (value, actions) => {
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
  };

  return (
    <Formik
      initialValues={loginFormInitValue}
      onSubmit={submitForm}
      validationSchema={loginForm}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        isSubmitting,
        errors,
      }) => (
        <Paper
          elevation={0}
          component="form"
          onSubmit={handleSubmit}
          className="p-4 relative border-[1px] border-solid rounded-2xl overflow-hidden"
          sx={(theme) => ({
            borderColor: alpha(theme.palette.action.disabled, 0.1),
          })}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
          >
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
              error={Boolean(errors.email) && touched.email}
              value={values.email}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              helperText={errors.email}
            />
            <TextField
              name="password"
              error={Boolean(errors.password) && touched.password}
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
              helperText={errors.password}
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
              <Paper
                className="absolute inset-0 opacity-90 z-10"
                elevation={0}
              ></Paper>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingLogo />
              </div>
            </>
          )}
        </Paper>
      )}
    </Formik>
  );
};

export default LoginBox;
