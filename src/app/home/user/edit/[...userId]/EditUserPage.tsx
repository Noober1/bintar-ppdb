"use client";
import React from "react";
import { GetUserQueryForEdit } from "./page";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Formik } from "formik";
import Autocomplete from "@/components/form/Autocomplete";
import { rolesStructure } from "@/constants/roles";
import { userForm } from "@/lib/formSchemas";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { UserFormValues } from "@/types/forms";
import { useSnackbar } from "notistack";
import { HandleFormSubmit } from "@/types/route";
import { useEditMutation } from "@/hooks/useAddMutation";

const UserEditPage = ({ userData }: { userData: GetUserQueryForEdit }) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation<UserFormValues>(
    "/crud/user/" + userData?.id
  );

  const handleFormSubmit: HandleFormSubmit<UserFormValues> = (
    value,
    action
  ) => {
    mutation.mutate(value, {
      onSuccess: () => {
        enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
        action.setSubmitting(false);
      },
      onError: () => {
        enqueueSnackbar("Data gagal disimpan", { variant: "error" });
        action.setSubmitting(false);
      },
    });
  };

  const grantedAccess = userData?.grantedAccess
    ? JSON.parse(userData?.grantedAccess as string)
    : [];

  const initialValues: UserFormValues = {
    email: userData?.email || "",
    fullname: userData?.fullname || "",
    password: "",
    repeatPassword: "",
    grantedAccess: grantedAccess,
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Edit pengguna: {userData?.fullname}</Typography>
      <Box component={Paper} className="p-4">
        <Alert severity="info" className="mb-4">
          Silahkan edit data dibawah ini
        </Alert>
        <Formik
          initialValues={initialValues}
          validationSchema={userForm("edit")}
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
                  disabled
                  helperText="Email tidak dapat diganti"
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
                  error={values.password !== values.repeatPassword}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText="Isi kata sandi jika ingin mengubah kata sandi"
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
                    label="Hak akses"
                    initialValue={grantedAccess}
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
                  Simpan Perubahan
                </LoadingButton>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default UserEditPage;
