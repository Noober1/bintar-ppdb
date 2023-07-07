"use client";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import React from "react";
import { majorForm } from "@/lib/formSchemas";
import { MajorFormValues } from "@/types/forms";
import { AxiosError } from "axios";
import { useAddMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { HandleFormSubmit } from "@/types/route";
import FormLayout from "@/components/layouts/FormLayout";

const formInitialValues: MajorFormValues = {
  initial: "",
  name: "",
};

const AddMajorPage = () => {
  const mutation = useAddMutation<MajorFormValues>("/crud/major/");
  const { enqueueSnackbar } = useSnackbar();

  const submitForm: HandleFormSubmit<MajorFormValues> = (values, actions) => {
    mutation.mutate(values, {
      onSuccess: () => {
        enqueueSnackbar("Jurusan berhasil ditambah", {
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
  };

  return (
    <Formik
      onSubmit={submitForm}
      validationSchema={majorForm}
      initialValues={formInitialValues}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <FormLayout
          onSubmit={handleSubmit}
          alert="Silahkan isi data dibawah ini"
          title="Tambah jurusan"
          errors={errors}
          isSubmitting={isSubmitting}
          submitButtonLabel="Tambah jurusan"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
        >
          <TextField
            name="initial"
            onChange={(event) =>
              setFieldValue("initial", event.target.value.toUpperCase())
            }
            onBlur={handleBlur}
            value={values.initial}
            error={Boolean(errors.initial)}
            helperText={errors.initial ?? "Akronim/singkatan dari jurusan"}
            label="Akronim jurusan"
          />
          <TextField
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={Boolean(errors.name)}
            helperText={errors.name ?? "Nama dari jurusan"}
            label="Nama Jurusan"
          />
        </FormLayout>
      )}
    </Formik>
  );
};

export default AddMajorPage;
