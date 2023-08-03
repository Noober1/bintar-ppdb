"use client";

import FormLayout from "@/components/layouts/FormLayout";
import { administrationForm } from "@/lib/formSchemas";
import { AdministrationFormValues } from "@/types/forms";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { AdministrationDataForEdit } from "./page";
import { useSnackbar } from "notistack";
import { useEditMutation } from "@/hooks/useAddMutation";
import { AxiosError } from "axios";
import useRefresh from "@/hooks/useRefresh";
import useForm from "@/hooks/useForm";

interface EditAdministrationPageProps {
  data: AdministrationDataForEdit;
}

const EditAdminitrationPage = ({ data }: EditAdministrationPageProps) => {
  useRefresh();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation("/crud/administration/" + data?.id);
  const formInitialValues: AdministrationFormValues = {
    description: data?.description || "",
    nominal: data?.nominal || 0,
    payer: data?.payer || "",
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isError,
    helperText,
    values,
    isSubmitting,
  } = useForm({
    initialValues: formInitialValues,
    validationSchema: administrationForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar(`Perubahan berhasi disimpan`, {
            variant: "success",
          });
          actions.setSubmitting(false);
        },
        onError: (error) => {
          const isAxiosError = error instanceof AxiosError;
          enqueueSnackbar(
            `Gagal menambah pembayaran, alasan: ${
              isAxiosError
                ? error.response?.data.message ?? error.message
                : "unknown error"
            }`,
            {
              variant: "error",
            }
          );
          actions.setSubmitting(false);
        },
      });
    },
  });

  return (
    <FormLayout
      backButtonUrl={`/home/administration/${data?.studentId}`}
      alert={
        <Typography>
          Sunting data pembayaran: <kbd>{data?.id}</kbd>
        </Typography>
      }
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title="Sunting data administrasi"
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

export default EditAdminitrationPage;
