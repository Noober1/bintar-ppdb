import PasswordTextField from "@/components/forms/PasswordTextField";
import { useEditMutation } from "@/hooks/useAddMutation";
import useForm from "@/hooks/useForm";
import { changePasswordForm } from "@/lib/formSchemas";
import { setLoading } from "@/lib/redux/multiDialog";
import { errorMutationHandler } from "@/lib/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";

interface FormValues {
  oldPassword: string;
  password: string;
  repeatPassword: string;
}

const formValues: FormValues = {
  oldPassword: "",
  password: "",
  repeatPassword: "",
};

const ChangePasswordBox = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const passwordData = useEditMutation("/api/user/password");
  const {
    handleSubmit,
    helperText,
    isError,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useForm({
    initialValues: formValues,
    onSubmit: (values, actions) => {
      dispatch(
        setLoading({
          name: "change-password-dialog",
          loading: true,
        })
      );
      passwordData.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
          actions.setSubmitting(false);
          dispatch(
            setLoading({
              name: "change-password-dialog",
              loading: false,
            })
          );
        },
        onError: (error) => {
          errorMutationHandler(error, enqueueSnackbar, actions);
          dispatch(
            setLoading({
              name: "change-password-dialog",
              loading: false,
            })
          );
        },
      });
    },
    validationSchema: changePasswordForm,
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 w-full"
    >
      <Typography variant="body1">Silahkan isi form dibawah ini</Typography>
      <PasswordTextField
        fullWidth
        name="oldPassword"
        error={isError("oldPassword")}
        helperText={helperText("oldPassword") ?? ""}
        label="Kata sandi lama"
        value={values.oldPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <PasswordTextField
        name="password"
        label="Kata baru"
        error={isError("password")}
        helperText={helperText("password") ?? ""}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <PasswordTextField
        name="repeatPassword"
        label="Ulangi kata sandi baru"
        error={isError("repeatPassword")}
        helperText={helperText("repeatPassword") ?? ""}
        value={values.repeatPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <Button type="submit" variant="contained">
        Ubah kata sandi
      </Button>
    </Box>
  );
};

export default ChangePasswordBox;
