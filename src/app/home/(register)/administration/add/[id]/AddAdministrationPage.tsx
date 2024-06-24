"use client";
import FormLayout from "@/components/layouts/FormLayout";
import { administrationForm } from "@/lib/formSchemas";
import { AdministrationFormValues } from "@/types/forms";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";
import { StudentData } from "./page";
import { useSnackbar } from "notistack";
import { useAddMutation } from "@/hooks/useAddMutation";
import { AxiosError } from "axios";
import useForm from "@/hooks/useForm";
import DatePicker from "@/components/inputs/DatePicker";

interface AddAdministrationPageProps {
  studentData: StudentData;
}

const formInitialValues: AdministrationFormValues = {
  date: new Date(),
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
    isError,
    helperText,
    values,
    isSubmitting,
    setFieldValue,
  } = useForm({
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

  return (
    <FormLayout
      backButtonUrl={`/home/administration/${studentData?.id}`}
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
      <DatePicker
        onChange={(value) => {
          setFieldValue("date", value);
        }}
        value={values.date || new Date()}
        helperText={helperText("date") ?? "Silahkan pilih tanggal pembayaran"}
        label="Tanggal pendaftaran ditutup"
      />
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
