"use client";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { majorForm } from "@/lib/formSchemas";
import { MajorFormValues } from "@/types/forms";
import { AxiosError } from "axios";
import { useAddMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { HandleFormSubmit } from "@/types/route";
import Paper from "@mui/material/Paper";

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
                Tambah data
              </LoadingButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddMajorPage;
