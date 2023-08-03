"use client";
import TextField from "@mui/material/TextField";
import React from "react";
import { majorForm } from "@/lib/formSchemas";
import { MajorFormValues } from "@/types/forms";
import { useAddMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import FormLayout from "@/components/layouts/FormLayout";
import useForm from "@/hooks/useForm";
import { errorMutationHandler } from "@/lib/utils";

const formInitialValues: MajorFormValues = {
  initial: "",
  name: "",
};

const AddMajorPage = () => {
  const mutation = useAddMutation<MajorFormValues>("/crud/major/");
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    isError,
    helperText,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useForm({
    initialValues: formInitialValues,
    validationSchema: majorForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Jurusan berhasil ditambah", {
            variant: "success",
          });
          actions.setSubmitting(false);
          actions.resetForm();
        },
        onError: (error) => {
          errorMutationHandler(error, enqueueSnackbar, actions);
        },
      });
    },
  });

  return (
    <FormLayout
      backButtonUrl="/home/major"
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
        error={isError("initial")}
        helperText={helperText("initial") ?? "Akronim/singkatan dari jurusan"}
        label="Akronim jurusan"
      />
      <TextField
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        error={isError("name")}
        helperText={helperText("name") ?? "Nama dari jurusan"}
        label="Nama Jurusan"
      />
    </FormLayout>
  );
};

export default AddMajorPage;
