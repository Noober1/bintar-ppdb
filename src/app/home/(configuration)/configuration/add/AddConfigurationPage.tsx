"use client";

import React from "react";
import FormLayout from "@/components/layouts/FormLayout";
import { useAddMutation } from "@/hooks/useAddMutation";
import { configurationForm } from "@/lib/formSchemas";
import { ConfigurationFormValues } from "@/types/forms";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import formikCustomHelper from "@/hooks/formikCustomHelper";

const formInitialValues: ConfigurationFormValues = {
  registrationFormat: "",
  year: new Date().getFullYear(),
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
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: configurationForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
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
  });

  const { helperText, isError } = formikCustomHelper(errors, touched);

  return (
    <FormLayout
      backButtonUrl="/home/configuration"
      onSubmit={handleSubmit}
      alert="Silahkan isi form dibawah ini"
      title="Tambah konfigurasi"
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
