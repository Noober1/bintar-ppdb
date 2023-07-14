"use client";
import FormLayout from "@/components/layouts/FormLayout";
import { administrationForm } from "@/lib/formSchemas";
import { AdministrationFormValues } from "@/types/forms";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";
import { StudentData } from "./page";
import formikCustomHelper from "@/hooks/formikCustomHelper";
import { useSnackbar } from "notistack";
import { useAddMutation } from "@/hooks/useAddMutation";
import { AxiosError } from "axios";

interface AddAdministrationPageProps {
  studentData: StudentData;
}

const formInitialValues: AdministrationFormValues = {
  description: "",
  nominal: 0,
  payer: "",
};

const AddAdministrationPage = ({ studentData }: AddAdministrationPageProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useAddMutation("/crud/administration/" + studentData?.id);
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: administrationForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar(
            `Pembayaran atas siswa ${studentData?.firstName} ${studentData?.lastName} berhasil ditambahkan`,
            { variant: "success" }
          );
          actions.resetForm();
          actions.setSubmitting(false);
        },
        onError: (error) => {
          const isAxiosError = error instanceof AxiosError;
          enqueueSnackbar(
            `Gagal menambah pembayaran, alasan: ${
              isAxiosError
                ? error.response?.data.message ?? error.message
                : "unknown error"
            }`
          );
          actions.setSubmitting(false);
        },
      });
    },
  });

  const { isError, helperText } = formikCustomHelper(errors, touched);

  return (
    <FormLayout
      alert={
        <Typography>
          Pembayaran untuk{" "}
          <kbd>
            {studentData?.firstName} {studentData?.lastName}
          </kbd>
          ({studentData?.formerSchool?.name})
        </Typography>
      }
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Tambah pembayaran"
      title="Tambah pembayaran"
    >
      <TextField
        name="description"
        label="Perihal"
        helperText={
          helperText("description") ?? "Silahkan isi perihal pembayaran"
        }
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError("description")}
      />
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        }}
        type="number"
        name="nominal"
        label="nominal"
        helperText={helperText("nominal") ?? "Silahkan isi jumlah pembayaran"}
        value={values.nominal}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError("nominal")}
      />
      <TextField
        name="payer"
        label="Pembayar"
        helperText={helperText("payer") ?? "Silahkan isi nama pembayar"}
        value={values.payer}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError("payer")}
      />
    </FormLayout>
  );
};

export default AddAdministrationPage;
