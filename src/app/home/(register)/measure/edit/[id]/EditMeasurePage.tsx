"use client";
import React from "react";
import { MeasureDataForEdit } from "./page";
import FormLayout from "@/components/layouts/FormLayout";
import { useFormik } from "formik";
import { MeasureFormValues, sizes } from "@/types/forms";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { TextField } from "@mui/material";
import formikCustomHelper from "@/hooks/formikCustomHelper";
import { measureForm } from "@/lib/formSchemas";
import useRefresh from "@/hooks/useRefresh";
import { useSnackbar } from "notistack";
import { useEditMutation } from "@/hooks/useAddMutation";
import { AxiosError } from "axios";

interface EditMeasurePageProps {
  data: MeasureDataForEdit;
}

const EditMeasurePage = ({ data }: EditMeasurePageProps) => {
  useRefresh();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation(`/crud/measure/${data?.id}`);
  const formInitialValues: MeasureFormValues = {
    gymUniformSize: data?.gymUniformSize || "S",
    primaryUniformSize: data?.primaryUniformSize || "S",
    secondaryUniformSize: data?.secondaryUniformSize || "S",
    shoeSize: data?.shoeSize || 0,
  };
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: measureForm,
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar(
            `Data pengukuran siswa ${
              data?.firstName + " " + data?.lastName
            } berhasil disimpan`,
            {
              variant: "success",
            }
          );
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
    },
  });

  const { isError, helperText } = formikCustomHelper(errors, touched);
  return (
    <FormLayout
      backButtonUrl="/home/measure"
      alert={`Edit data siswa ${data?.firstName + " " + data?.lastName}(${
        data?.registrationNumber
      })`}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title="Sunting pengukuran"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
    >
      <FormControl>
        <InputLabel>Ukuran seragam bintar</InputLabel>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.primaryUniformSize}
          name="primaryUniformSize"
          label="Ukuran seragam bintar"
        >
          {sizes.map((value) => (
            <MenuItem
              key={value}
              value={value}
              selected={values.primaryUniformSize === value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pilih ukuran baju yang sesuai</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Ukuran baju praktek</InputLabel>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.secondaryUniformSize}
          name="secondaryUniformSize"
          label="Ukuran baju praktek"
        >
          {sizes.map((value) => (
            <MenuItem
              key={value}
              value={value}
              selected={values.secondaryUniformSize === value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pilih ukuran baju yang sesuai</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Ukuran baju olahraga</InputLabel>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gymUniformSize}
          name="gymUniformSize"
          label="Ukuran baju olahraga"
        >
          {sizes.map((value) => (
            <MenuItem
              key={value}
              value={value}
              selected={values.gymUniformSize === value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pilih ukuran baju yang sesuai</FormHelperText>
      </FormControl>
      <TextField
        name="shoeSize"
        label="Ukuran sepatu"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.shoeSize}
        error={isError("shoeSize")}
        helperText={
          helperText("shoeSize") ?? "Silahkan isi ukuran sepatu yang sesuai"
        }
      />
    </FormLayout>
  );
};

export default EditMeasurePage;
