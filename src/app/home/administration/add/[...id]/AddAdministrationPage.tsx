"use client";
import FormLayout from "@/components/layouts/FormLayout";
import { administrationForm } from "@/lib/formSchemas";
import { AdministrationFormValues } from "@/types/forms";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";

const formInitialValues: AdministrationFormValues = {
  description: "",
  nominal: 0,
  payer: "",
};

const AddAdministrationPage = () => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: administrationForm,
    onSubmit: (values, actions) => {},
  });

  return (
    <FormLayout
      alert="Silahkan isi data dibawah ini"
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Tambah pembayaran"
      title="Tambah pembayaran"
    >
      <TextField
        name="description"
        label="Perihal"
        helperText={errors.description ?? "Silahkan isi perihal pembayaran"}
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.description)}
      />
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        }}
        type="number"
        name="nominal"
        label="nominal"
        helperText={errors.nominal ?? "Silahkan isi jumlah pembayaran"}
        value={values.nominal}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.nominal)}
      />
      <TextField
        name="payer"
        label="Pembayar"
        helperText={errors.payer ?? "Silahkan isi nama pembayar"}
        value={values.payer}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.payer)}
      />
    </FormLayout>
  );
};

export default AddAdministrationPage;
