"use client";
import { majorForm } from "@/lib/formSchemas";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import React from "react";
import { HandleFormSubmit } from "@/types/route";
import { MajorFormValues } from "@/types/forms";
import { MajorDataForEdit } from "./page";
import SaveIcon from "@mui/icons-material/Save";
import { useSnackbar } from "notistack";
import { useEditMutation } from "@/hooks/useAddMutation";

interface EditMajorPageProps {
  data: MajorDataForEdit;
}

const EditMajorPage = ({ data }: EditMajorPageProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation<MajorFormValues>("/crud/major/" + data?.id);
  const submitForm: HandleFormSubmit<MajorFormValues> = (values, actions) => {
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
  };

  const formInitialValues: MajorFormValues = {
    initial: data?.initial || "",
    name: data?.name || "",
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Tambah jurusan</Typography>
      <Box component={Paper} className="p-4">
        <Alert severity="info" className="mb-4">
          Silahkan isi data dibawah ini
        </Alert>
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
            <Box
              component="form"
              onSubmit={handleSubmit}
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
              <LoadingButton
                size="large"
                variant="contained"
                type={!isSubmitting ? "submit" : "button"}
                loading={isSubmitting}
                disabled={Object.keys(errors).length > 0}
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Simpan perubahan
              </LoadingButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default EditMajorPage;
