"use client";
import React from "react";
import { SchoolDataForEdit } from "./page";
import { SchoolFormValues, schoolOptions } from "@/types/forms";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { schoolForm } from "@/lib/formSchemas";
import FormLayout from "@/components/layouts/FormLayout";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import useRefresh from "@/hooks/useRefresh";
import useForm from "@/hooks/useForm";

interface EditSchoolPageProps {
  data: SchoolDataForEdit;
}

const EditSchoolPage = ({ data }: EditSchoolPageProps) => {
  useRefresh();
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation<SchoolFormValues>(
    "/crud/school/" + data?.id
  );
  const formInitialValues: SchoolFormValues = {
    address: data?.address || "",
    name: data?.name || "",
    NPSN: data?.NPSN || 0,
    type: data?.type || "SMP",
  };
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    isError,
    helperText,
    handleSubmit,
    isSubmitting,
  } = useForm({
    initialValues: formInitialValues,
    validationSchema: schoolForm,
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
      backButtonUrl="/home/school"
      alert="Silahkan sunting data yang ada dibawah ini"
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title="Sunting sekolah"
    >
      <TextField
        name="NPSN"
        value={values.NPSN}
        error={isError("NPSN")}
        onChange={handleChange}
        onBlur={handleBlur}
        label="NPSN"
        helperText={helperText("NPSN") ?? "NPSN"}
      />
      <FormControl>
        <InputLabel>Jenis sekolah</InputLabel>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.type}
          name="type"
          label="Jenis sekolah"
        >
          {schoolOptions.map((value) => (
            <MenuItem
              key={value}
              value={value}
              selected={values.type === value}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pilih salah satu jenjang pendidikan</FormHelperText>
      </FormControl>
      <TextField
        name="name"
        value={values.name}
        error={isError("name")}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Nama sekolah"
        helperText={helperText("name") ?? "Masukan nama sekolah disini"}
      />
      <TextField
        className="lg:col-span-3"
        name="address"
        value={values.address}
        error={isError("address")}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Alamat"
        helperText={
          helperText("address") ?? "Masukan alamat lengkap sekolah disini"
        }
      />
    </FormLayout>
  );
};

export default EditSchoolPage;
