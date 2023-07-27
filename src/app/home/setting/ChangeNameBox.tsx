"use client";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { useFormik } from "formik";
import formikCustomHelper from "@/hooks/formikCustomHelper";
import { useDispatch } from "react-redux";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import { setLoading } from "@/lib/redux/multiDialog";
import Button from "@mui/material/Button";
import { changeNameForm } from "@/lib/formSchemas";

interface ChangeNameBoxProps {
  fullName?: string;
}

interface FormValues {
  fullName: string;
}

const ChangeNameBox = ({ fullName }: ChangeNameBoxProps) => {
  const dispatch = useDispatch();
  const nameDate = useEditMutation("/api/user/name");
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      fullName: fullName || "",
    } as FormValues,
    validationSchema: changeNameForm,
    onSubmit: (values, actions) => {
      dispatch(
        setLoading({
          name: "change-name-dialog",
          loading: true,
        })
      );
      nameDate.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
          actions.setSubmitting(false);
          dispatch(
            setLoading({
              name: "change-name-dialog",
              loading: false,
            })
          );
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
          dispatch(
            setLoading({
              name: "change-name-dialog",
              loading: false,
            })
          );
        },
      });
    },
  });

  const { isError, helperText } = formikCustomHelper(errors, touched);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 w-full"
    >
      <Typography variant="body1">Silahkan isi form dibawah ini</Typography>
      <TextField
        fullWidth
        name="fullName"
        error={isError("fullName")}
        helperText={helperText("fullName") ?? ""}
        label="Nama lengkap"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <Button type="submit" variant="contained">
        Ubah Nama
      </Button>
    </Box>
  );
};

export default ChangeNameBox;
