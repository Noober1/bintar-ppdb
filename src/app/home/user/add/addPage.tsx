"use client";
import React, { useRef } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Formik, FormikHelpers } from "formik";
import Autocomplete, {
  AutocompleteHandles,
} from "@/components/form/Autocomplete";
import { rolesStructure } from "@/constants/roles";
import { userForm } from "@/lib/formSchemas";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { UserFormValues } from "@/types/forms";
import { useSnackbar } from "notistack";
import { useAddMutation } from "@/hooks/useAddMutation";
import { HandleFormSubmit } from "@/types/route";

const AddPage = () => {
  const autoCompleteRef = useRef<AutocompleteHandles>(null);
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useAddMutation<UserFormValues>("/crud/user/");

  const handleFormSubmit: HandleFormSubmit<UserFormValues> = (
    value,
    action
  ) => {
    action.setSubmitting(true);
    mutation.mutate(value, {
      onSuccess: () => {
        enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
        action.setSubmitting(false);
        action.resetForm();
        autoCompleteRef.current?.resetSelection();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          enqueueSnackbar(
            error.response?.data.message || "Data gagal disimpan",
            { variant: "error" }
          );
        } else {
          enqueueSnackbar("Data gagal disimpan, ", { variant: "error" });
        }
        action.setSubmitting(false);
      },
    });
  };

  const initialValues: UserFormValues = {
    email: "",
    fullname: "",
    password: "",
    repeatPassword: "",
    grantedAccess: [],
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Tambah pengguna</Typography>
      <Box component={Paper} className="p-4">
        <Alert severity="info" className="mb-4">
          Silahkan isi data dibawah ini
        </Alert>
        <Formik
          initialValues={initialValues}
          validationSchema={userForm("add")}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            errors,
          }) => (
            <>
              <Box
                component="form"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
              >
                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email ?? "Email pengguna sebagai kredensial login"
                  }
                />
                <TextField
                  name="fullname"
                  label="Nama lengkap"
                  error={Boolean(errors.fullname)}
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.fullname ?? "Nama lengkap pengguna"}
                />
                <TextField
                  name="password"
                  type="password"
                  label="Kata sandi"
                  error={
                    Boolean(errors.password) ||
                    values.password !== values.repeatPassword
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password ??
                    "Kata sandi pengguna sebagai kredensial login"
                  }
                />
                <TextField
                  name="repeatPassword"
                  label="Ulangi kata sandi"
                  type="password"
                  error={values.password !== values.repeatPassword}
                  value={values.repeatPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    values.password !== values.repeatPassword
                      ? "Kata sandi tidak sama dengan sebelumnya"
                      : " "
                  }
                />
                <div className="md:col-span-2">
                  <Autocomplete
                    ref={autoCompleteRef}
                    label="Hak akses"
                    initialValue={[]}
                    options={rolesStructure}
                    onChange={(value) => {
                      setFieldValue("grantedAccess", value);
                    }}
                  />
                </div>
                <LoadingButton
                  size="large"
                  variant="contained"
                  type={!isSubmitting ? "submit" : "button"}
                  loading={isSubmitting}
                  disabled={
                    Object.keys(errors).length > 0 ||
                    values.password !== values.repeatPassword
                  }
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                >
                  Tambah data
                </LoadingButton>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddPage;
