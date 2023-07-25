import PasswordTextField from "@/components/forms/PasswordTextField";
import formikCustomHelper from "@/hooks/formikCustomHelper";
import { useEditMutation } from "@/hooks/useAddMutation";
import { changePasswordForm } from "@/lib/formSchemas";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";

interface ChangePasswordBoxProps {}

export interface ChangePasswordBoxHandles {
  submit: () => void;
}

interface FormValues {
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

const formValues: FormValues = {
  oldPassword: "",
  password: "",
  repeatPassword: "",
};

const ChangePasswordBox = (
  props: ChangePasswordBoxProps,
  ref: Ref<ChangePasswordBoxHandles>
) => {
  const passwordData = useEditMutation("/api/user/password");
  const {
    submitForm,
    handleSubmit,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: formValues,
    onSubmit: (values, actions) => {
      passwordData.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
          actions.setSubmitting(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            enqueueSnackbar(
              "Data gagal disimpan, alasan: " + error.response?.data.message,
              { variant: "error" }
            );
          } else {
            enqueueSnackbar("Data gagal disimpan", { variant: "error" });
          }
          actions.setSubmitting(false);
        },
      });
    },
    validationSchema: changePasswordForm,
  });

  const { helperText, isError } = formikCustomHelper(errors, touched);

  useImperativeHandle(ref, () => ({
    submit: () => submitForm(),
  }));

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 w-screen max-w-md"
    >
      <Typography variant="body1">Silahkan isi form dibawah ini</Typography>
      <PasswordTextField
        fullWidth
        name="oldPassword"
        error={isError("oldPassword")}
        helperText={helperText("oldPassword") ?? ""}
        label="Kata sandi lama"
        value={values.oldPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <PasswordTextField
        name="password"
        label="Kata baru"
        error={isError("password")}
        helperText={helperText("password") ?? ""}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <PasswordTextField
        name="repeatPassword"
        label="Ulangi kata sandi baru"
        error={isError("repeatPassword")}
        helperText={helperText("repeatPassword") ?? ""}
        value={values.repeatPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <button type="submit" className="hidden">
        Submit
      </button>
    </Box>
  );
};

export default forwardRef(ChangePasswordBox);
