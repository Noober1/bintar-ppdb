"use client";
import { schoolForm } from "@/lib/formSchemas";
import { SchoolForm } from "@/types/forms";
import { HandleFormSubmit } from "@/types/route";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { SCHOOL_TYPES } from "@prisma/client";
import { Formik } from "formik";
import React from "react";
import FormLayout from "@/components/layouts/FormLayout";

const initialValues: SchoolForm = {
  NPSN: 0,
  type: "SMP",
  name: "",
  address: "",
};

const schoolOptions: SCHOOL_TYPES[] = ["SMP", "MTS"];

const AddSchoolPage = () => {
  const submitForm: HandleFormSubmit<SchoolForm> = (values, actions) => {
    alert("oke");
    actions.setSubmitting(false);
  };
  return (
    <Formik
      onSubmit={submitForm}
      initialValues={initialValues}
      validationSchema={schoolForm}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        isSubmitting,
      }) => (
        <FormLayout
          title="Tambah sekolah"
          alert="Silahkan isi data dibawah ini"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
          submitButtonLabel="Tambah sekolah"
        >
          <TextField
            name="NPSN"
            value={values.NPSN}
            error={Boolean(errors.NPSN)}
            onChange={handleChange}
            onBlur={handleBlur}
            label="NPSN"
            helperText={errors.NPSN ?? "NPSN"}
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
            error={Boolean(errors.name)}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Nama sekolah"
            helperText={errors.name ?? "Masukan nama sekolah disini"}
          />
          <TextField
            name="address"
            value={values.address}
            error={Boolean(errors.address)}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Alamat"
            helperText={
              errors.address ?? "Masukan alamat lengkap sekolah disini"
            }
          />
        </FormLayout>
      )}
    </Formik>
  );
};

export default AddSchoolPage;
