"use client";
import React, { useRef } from "react";
import { StudentDataForEdit } from "./page";
import { useFormik } from "formik";
import { StudentFormValues } from "@/types/forms";
import { basicForm } from "@/lib/formSchemas";
import FormLayout from "@/components/layouts/FormLayout";
import TextField from "@mui/material/TextField";
import DatePicker from "@/components/inputs/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { GENDERS } from "@prisma/client";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import ServersideSelect, {
  ServerSideSelectHandles,
} from "@/components/inputs/ServersideSelect";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";
import formikCustomHelper from "@/hooks/formikCustomHelper";

export const genderList: {
  name: GENDERS;
  label: string;
}[] = [
  {
    label: "Laki-laki",
    name: "MALE",
  },
  {
    label: "Perempuan",
    name: "FEMALE",
  },
];

interface EditStudentPageProps {
  data: StudentDataForEdit;
}

const EditStudentPage = ({ data }: EditStudentPageProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const mutation = useEditMutation<StudentFormValues>(
    "/crud/student/" + data?.id
  );
  const schoolRef = useRef<ServerSideSelectHandles>(null);
  const majorRef = useRef<ServerSideSelectHandles>(null);
  const formInitialValues: StudentFormValues = {
    registrationNumber: data?.registrationNumber || "",
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    phoneNumber: data?.phoneNumber || "",
    email: data?.email || "",
    birthplace: data?.birthplace || "",
    birthdate: data?.birthdate ? new Date(data.birthdate) : new Date(),
    gender: data?.gender || "MALE",
    NISNNumber: data?.NISNNumber || "",
    schoolId: data?.schoolId || undefined,
    schoolGraduateYear: data?.schoolGraduateYear || new Date().getFullYear(),
    majorId: data?.majorId || undefined,
  };

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: basicForm("edit"),
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Data siswa berhasil diperbarui", {
            variant: "success",
          });
          actions.setSubmitting(false);
        },
        onError: (error) => {
          const axiosMessage = error instanceof AxiosError;
          enqueueSnackbar(
            axiosMessage
              ? error.response?.data.message
              : "Data siswa gagal diperbarui",
            { variant: "error" }
          );
          actions.setSubmitting(false);
        },
      });
    },
  });

  const { isError, helperText } = formikCustomHelper(errors, touched);

  return (
    <FormLayout
      alert="Silahkan sunting data dibawah ini"
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title="Sunting data siswa"
    >
      <TextField
        value={values.registrationNumber}
        helperText="No. Registrasi tidak dapat diubah"
        disabled
        label="No. Registrasi"
      />
      <TextField
        name="firstName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
        error={isError("firstName")}
        helperText={helperText("firstName") ?? "Nama depan siswa"}
        label="Nama depan"
      />
      <TextField
        name="lastName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
        error={isError("lastName")}
        helperText={helperText("lastName") ?? "Nama belakang siswa"}
        label="Nama belakang"
      />
      <TextField
        name="phoneNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phoneNumber}
        error={isError("phoneNumber")}
        helperText={helperText("phoneNumber") ?? "No. Telpon/HP siswa"}
        label="No. Telpon"
      />
      <TextField
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={isError("email")}
        helperText={helperText("email") ?? "Surel/Email siswa"}
        label="Email"
      />
      <TextField
        name="birthplace"
        onChange={(event) => {
          setFieldValue("birthplace", event.target.value.toUpperCase());
        }}
        onBlur={handleBlur}
        value={values.birthplace}
        error={isError("birthplace")}
        helperText={helperText("birthplace") ?? "Tempat lahir siswa"}
        label="Tempat lahir"
      />
      <DatePicker
        onChange={(value) => {
          setFieldValue("birthdate", value);
        }}
        value={values.birthdate || new Date()}
        helperText="Tanggal lahir siswa"
        label="Tanggal lahir"
      />
      <FormControl>
        <InputLabel>Jenis Kelamin</InputLabel>
        <Select
          name="gender"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
          label="Jenis kelamin"
        >
          {genderList.map((value) => (
            <MenuItem
              key={value.name}
              value={value.name}
              selected={values.gender === value.name}
            >
              {value.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Pilih salah satu jenis kelamin</FormHelperText>
      </FormControl>
      <TextField
        name="NISNNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.NISNNumber}
        error={isError("NISNNumber")}
        helperText={
          helperText("NISNNumber") ?? "No. Induk Siswa Nasional(NSIN) siswa"
        }
        label="NISN"
      />
      <ServersideSelect
        ref={schoolRef}
        initialValue={values.schoolId}
        url="/api/schools"
        error={Boolean(errors.schoolId)}
        helperText={errors.schoolId ?? "Silahkan pilih asal sekolah"}
        label="Sekolah Asal"
        onChange={(value) => {
          setFieldValue("schoolId", value);
        }}
      />
      <TextField
        name="schoolGraduateYear"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.schoolGraduateYear}
        error={isError("schoolGraduateYear")}
        helperText={
          helperText("schoolGraduateYear") ??
          "Tahun lulus siswa dari pendidikan terakhir"
        }
        label="Tahun lulus"
      />
      <ServersideSelect
        ref={majorRef}
        url="/api/major"
        initialValue={values.majorId}
        error={Boolean(errors.majorId)}
        label="Jurusan yang dipilih"
        helperText={
          errors.majorId ?? "Silahkan pilih jurusan yang akan dipilih"
        }
        onChange={(value) => {
          setFieldValue("majorId", value);
        }}
      />
    </FormLayout>
  );
};

export default EditStudentPage;
