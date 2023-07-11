"use client";
import { schoolForm } from "@/lib/formSchemas";
import { SchoolFormValues, schoolOptions } from "@/types/forms";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";
import FormLayout from "@/components/layouts/FormLayout";
import { useAddMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import formikCustomHelper from "@/hooks/formikCustomHelper";

const formInitialValues: SchoolFormValues = {
  NPSN: 0,
  type: "SMP",
  name: "",
  address: "",
};

const AddSchoolPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useAddMutation<SchoolFormValues>("/crud/school/");
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
    validationSchema: schoolForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Sekolah berhasil ditambah", {
            variant: "success",
          });
          actions.setSubmitting(false);
          actions.resetForm();
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
          actions.setSubmitting(false);
        },
      });
    },
  });

  const { helperText, isError } = formikCustomHelper(errors, touched);

  return (
    <FormLayout
      title="Tambah sekolah"
      alert="Silahkan isi data dibawah ini"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      errors={errors}
      submitButtonLabel="Tambah sekolah"
    >
      <TextField
        name="NPSN"
        value={values.NPSN}
        error={isError("NPSN")}
        onChange={handleChange}
        onBlur={handleBlur}
        label="NPSN"
        helperText={helperText("NPSN") ?? "NPSN"}
      />
      <FormControl>
        <InputLabel>Jenis sekolah</InputLabel>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.type}
          name="type"
          label="Jenis sekolah"
        >
          {schoolOptions.map((value) => (
            <MenuItem
              key={value}
              value={value}
              selected={values.type === value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pilih salah satu jenjang pendidikan</FormHelperText>
      </FormControl>
      <TextField
        name="name"
        value={values.name}
        error={isError("name")}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Nama sekolah"
        helperText={helperText("name") ?? "Masukan nama sekolah disini"}
      />
      <TextField
        className="lg:col-span-3"
        name="address"
        value={values.address}
        error={isError("address")}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Alamat"
        helperText={
          helperText("address") ?? "Masukan alamat lengkap sekolah disini"
        }
      />
    </FormLayout>
  );
};

export default AddSchoolPage;
