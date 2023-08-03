"use client";

import React from "react";
import FormLayout from "@/components/layouts/FormLayout";
import { useAddMutation } from "@/hooks/useAddMutation";
import { configurationForm } from "@/lib/formSchemas";
import { ConfigurationFormValues } from "@/types/forms";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import useForm from "@/hooks/useForm";
import DatePicker from "@/components/inputs/DatePicker";
import { errorMutationHandler } from "@/lib/utils";

const initialValues: ConfigurationFormValues = {
  registrationFormat: "",
  year: new Date().getFullYear(),
  registrationDateOpen: new Date(),
  registrationDateClose: new Date(),
};

const AddConfigurationPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useAddMutation<ConfigurationFormValues>(
    "/crud/configuration/"
  );

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    helperText,
    isError,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useForm({
    initialValues,
    validationSchema: configurationForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
          actions.setSubmitting(false);
        },
        onError: (error) => {
          errorMutationHandler(error, enqueueSnackbar, actions);
        },
      });
    },
  });

  return (
    <FormLayout
      backButtonUrl="/home/configuration"
      onSubmit={handleSubmit}
      alert="Silahkan isi form dibawah ini"
      title="Edit konfigurasi PPDB"
      errors={errors}
      isSubmitting={isSubmitting}
      submitButtonLabel="Simpan konfigurasi"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
    >
      <TextField
        name="year"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.year}
        error={isError("year")}
        helperText={helperText("year") ?? "Tahun PPDB dilaksanakan"}
        label="Tahun PPDB"
      />
      <DatePicker
        onChange={(value) => {
          setFieldValue("registrationDateOpen", value);
        }}
        value={values.registrationDateOpen || new Date()}
        helperText={
          helperText("registrationDateOpen") ??
          "Silahkan pilih tanggal pendaftaran PPDB dibuka"
        }
        label="Tanggal pendaftaran dibuka"
      />
      <DatePicker
        onChange={(value) => {
          setFieldValue("registrationDateClose", value);
        }}
        value={values.registrationDateClose || new Date()}
        helperText={
          helperText("registrationDateClose") ??
          "Silahkan pilih tanggal pendaftaran PPDB ditutup"
        }
        label="Tanggal pendaftaran ditutup"
      />
      <TextField
        name="registrationFormat"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.registrationFormat}
        error={isError("registrationFormat")}
        helperText={
          helperText("registrationFormat") ??
          "Pastikan format nomor registrasi mengandung text [Y],[I], dan [N]. Kosongkan saja jika ingin mengisi sesuai dengan bawaannya"
        }
        label="Format No. Registrasi"
      />
    </FormLayout>
  );
};

export default AddConfigurationPage;
