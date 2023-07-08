"use client";
import React from "react";
import { GetUserQueryForEdit } from "./page";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Formik } from "formik";
import Autocomplete from "@/components/inputs/Autocomplete";
import { rolesStructure } from "@/constants/roles";
import { userForm } from "@/lib/formSchemas";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { UserFormValues } from "@/types/forms";
import { useSnackbar } from "notistack";
import { HandleFormSubmit } from "@/types/route";
import { useEditMutation } from "@/hooks/useAddMutation";
import FormLayout from "@/components/layouts/FormLayout";

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
        <FormLayout
          alert="Silahkan untuk menyunting data yang dibutuhkan dibawah ini"
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          submitButtonLabel="Simpan perubahan"
          title={`Edit pengguna: ${userData?.fullname}`}
          submitButtonDisable={
            Object.keys(errors).length > 0 ||
            values.password !== values.repeatPassword
          }
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
        </FormLayout>
      )}
    </Formik>
  );
};

export default UserEditPage;
