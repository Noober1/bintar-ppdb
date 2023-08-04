"use client";

import FormLayout from "@/components/layouts/FormLayout";
import useForm from "@/hooks/useForm";
import { announcementForm } from "@/lib/formSchemas";
import TextField from "@mui/material/TextField";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Box from "@mui/material/Box";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { errorMutationHandler } from "@/lib/utils";
import RichTextEditor from "@/components/forms/RichTextEditor";
import { AnnouncementFormValues } from "@/types/forms";
import { AnnouncementDataForEdit } from "./page";

interface EditAnnouncementPageProps {
  data: AnnouncementDataForEdit;
}

const EditAnnouncementPage = ({ data }: EditAnnouncementPageProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation(`/crud/announcement/${data?.id}`);

  const initialValues: AnnouncementFormValues = {
    title: data?.title || "",
    content: data?.content || "",
  };

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
    initialValues,
    validationSchema: announcementForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data berhasil diperbarui", { variant: "success" });
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
      title="Sunting pengumuman"
      alert="Silahkan isi form dibawah ini"
      backButtonUrl="/home/announcement"
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      className="grid-cols-1"
    >
      <TextField
        name="title"
        label="Judul pengumuman"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          placeholder: "Silahkan isi judul pengumuman",
        }}
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError("title")}
        helperText={helperText("title") ?? ""}
      />
      <Box className="mt-4">
        <RichTextEditor
          initialContent={values.content}
          onChange={(value) => setFieldValue("content", value)}
        />
      </Box>
    </FormLayout>
  );
};

export default EditAnnouncementPage;
