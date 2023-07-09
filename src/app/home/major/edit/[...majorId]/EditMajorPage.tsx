"use client";
import { majorForm } from "@/lib/formSchemas";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";
import { MajorFormValues } from "@/types/forms";
import { MajorDataForEdit } from "./page";
import { useSnackbar } from "notistack";
import { useEditMutation } from "@/hooks/useAddMutation";
import FormLayout from "@/components/layouts/FormLayout";

interface EditMajorPageProps {
  data: MajorDataForEdit;
}

const EditMajorPage = ({ data }: EditMajorPageProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation<MajorFormValues>("/crud/major/" + data?.id);
  const formInitialValues: MajorFormValues = {
    initial: data?.initial || "",
    name: data?.name || "",
  };
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: majorForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
          actions.setSubmitting(false);
        },
        onError: () => {
          enqueueSnackbar("Data gagal disimpan", { variant: "error" });
          actions.setSubmitting(false);
        },
      });
    },
  });

  return (
    <FormLayout
      onSubmit={handleSubmit}
      alert="Silahkan sunting data yang ada dibawah ini"
      title="Sunting jurusan"
      errors={errors}
      isSubmitting={isSubmitting}
      submitButtonLabel="Simpan perubahan"
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
  );
};

export default EditMajorPage;
