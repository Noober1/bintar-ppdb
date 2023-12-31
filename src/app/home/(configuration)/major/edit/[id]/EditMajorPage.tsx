"use client";
import { majorForm } from "@/lib/formSchemas";
import TextField from "@mui/material/TextField";
import React from "react";
import { MajorFormValues } from "@/types/forms";
import { MajorDataForEdit } from "./page";
import { useSnackbar } from "notistack";
import { useEditMutation } from "@/hooks/useAddMutation";
import FormLayout from "@/components/layouts/FormLayout";
import useRefresh from "@/hooks/useRefresh";
import useForm from "@/hooks/useForm";

interface EditMajorPageProps {
  data: MajorDataForEdit;
}

const EditMajorPage = ({ data }: EditMajorPageProps) => {
  useRefresh();
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
    isError,
    helperText,
    errors,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useForm({
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
      backButtonUrl="/home/major"
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

export default EditMajorPage;
