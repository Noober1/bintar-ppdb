"use client";
import React, { useRef } from "react";
import TextField from "@mui/material/TextField";

import { useFormik } from "formik";
import Autocomplete, {
  AutocompleteHandles,
} from "@/components/inputs/Autocomplete";
import { rolesStructure } from "@/constants/roles";
import { userForm } from "@/lib/formSchemas";
import { AxiosError } from "axios";
import { UserFormValues } from "@/types/forms";
import { useSnackbar } from "notistack";
import { useAddMutation } from "@/hooks/useAddMutation";
import FormLayout from "@/components/layouts/FormLayout";

const AddUserPage = () => {
  const autoCompleteRef = useRef<AutocompleteHandles>(null);
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useAddMutation<UserFormValues>("/crud/user/");
  const formInitialValues: UserFormValues = {
    email: "",
    fullname: "",
    password: "",
    repeatPassword: "",
    grantedAccess: [],
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: userForm("add"),
    onSubmit: (value, action) => {
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
    },
  });

  return (
    <FormLayout
      title="Tambah pengguna"
      alert="Silahkan isi data dibawah ini"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      errors={errors}
      submitButtonLabel="Tambah pengguna"
      submitButtonDisable={
        Object.keys(errors).length > 0 ||
        values.password !== values.repeatPassword
      }
    >
      <TextField
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.email)}
        helperText={errors.email ?? "Email pengguna sebagai kredensial login"}
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
          Boolean(errors.password) || values.password !== values.repeatPassword
        }
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={
          errors.password ?? "Kata sandi pengguna sebagai kredensial login"
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
    </FormLayout>
  );
};

export default AddUserPage;
