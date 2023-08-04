"use client";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { useDispatch } from "react-redux";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { setClose, setLoading } from "@/lib/redux/multiDialog";
import Button from "@mui/material/Button";
import { changeNameForm } from "@/lib/formSchemas";
import useForm from "@/hooks/useForm";
import { errorMutationHandler } from "@/lib/utils";

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
    isError,
    helperText,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useForm({
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
          dispatch(setClose());
        },
        onError: (error) => {
          errorMutationHandler(error, enqueueSnackbar, actions);
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
