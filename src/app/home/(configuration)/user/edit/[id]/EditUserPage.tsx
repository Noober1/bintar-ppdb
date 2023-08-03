"use client";
import React from "react";
import { GetUserQueryForEdit } from "./page";
import TextField from "@mui/material/TextField";
import Autocomplete from "@/components/inputs/Autocomplete";
import { rolesStructure } from "@/constants/roles";
import { userForm } from "@/lib/formSchemas";
import { UserFormValues } from "@/types/forms";
import { useSnackbar } from "notistack";
import { useEditMutation } from "@/hooks/useAddMutation";
import FormLayout from "@/components/layouts/FormLayout";
import useRefresh from "@/hooks/useRefresh";
import useForm from "@/hooks/useForm";

const UserEditPage = ({ userData }: { userData: GetUserQueryForEdit }) => {
  useRefresh();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation<UserFormValues>(
    "/crud/user/" + userData?.id
  );

  const grantedAccess = userData?.grantedAccess
    ? JSON.parse(userData?.grantedAccess as string)
    : [];
  const formInitialValues: UserFormValues = {
    email: userData?.email || "",
    fullname: userData?.fullname || "",
    password: "",
    repeatPassword: "",
    grantedAccess: grantedAccess,
  };

  const {
    values,
    handleChange,
    handleBlur,
    isError,
    helperText,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    errors,
  } = useForm({
    initialValues: formInitialValues,
    validationSchema: userForm("edit"),
    onSubmit: (value, action) => {
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
    },
  });

  return (
    <FormLayout
      alert="Silahkan untuk menyunting data yang dibutuhkan dibawah ini"
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title={`Edit pengguna: ${userData?.fullname}`}
      backButtonUrl="/home/user"
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
        error={isError("fullname")}
        value={values.fullname}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={helperText("fullname") ?? "Nama lengkap pengguna"}
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
  );
};

export default UserEditPage;
