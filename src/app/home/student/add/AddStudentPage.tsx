"use client";
import DatePicker from "@/components/inputs/DatePicker";
import ServersideSelect, {
  ServerSideSelectHandles,
} from "@/components/inputs/ServersideSelect";
import FormLayout from "@/components/layouts/FormLayout";
import { useAddMutation } from "@/hooks/useAddMutation";
import { basicForm } from "@/lib/formSchemas";
import { StudentFormValues, genderSelectList } from "@/types/forms";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CachedIcon from "@mui/icons-material/Cached";
import { GENDERS } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import formikCustomHelper from "@/hooks/formikCustomHelper";

const formInitialValues: StudentFormValues = {
  registrationNumber: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  majorId: undefined,
  schoolId: undefined,
  email: "",
  birthplace: "",
  birthdate: new Date(),
  gender: "MALE",
  NISNNumber: "",
  schoolGraduateYear: new Date().getFullYear(),
};

const genderList: {
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

const AddStudentPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const majorRef = useRef<ServerSideSelectHandles>(null);
  const schoolRef = useRef<ServerSideSelectHandles>(null);
  const [generateLoading, setGenerateLoading] = useState<boolean>(false);
  const mutation = useAddMutation("/crud/student");

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: formInitialValues,
    validationSchema: basicForm("add"),
    onSubmit: (values, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar("Siswa berhasil ditambah", {
            variant: "success",
          });
          actions.setSubmitting(false);
          actions.setFieldValue("registrationNumber", "");
          actions.resetForm();
          majorRef.current?.resetValue();
          schoolRef.current?.resetValue();
        },
        onError: (error) => {
          const axiosMessage = error instanceof AxiosError;
          enqueueSnackbar(
            axiosMessage ? error.response?.data.message : "Data gagal disimpan",
            { variant: "error" }
          );
          actions.setSubmitting(false);
        },
      });
    },
  });

  const { isError, helperText } = formikCustomHelper(errors, touched);

  const generateRegNumber = () => {
    setGenerateLoading(true);
    axios
      .get("/api/generate-reg-id")
      .then((result) => {
        setFieldValue("registrationNumber", result.data.registrationNumber);
      })
      .finally(() => {
        setGenerateLoading(false);
      });
  };

  return (
    <FormLayout
      alert="Silahkan isi form dibawah ini"
      errors={errors}
      isSubmitting={isSubmitting}
      submitButtonDisable={generateLoading}
      onSubmit={handleSubmit}
      submitButtonLabel="Tambah siswa"
      title="Tambah calon siswa baru"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2"
    >
      <TextField
        name="registrationNumber"
        disabled={generateLoading}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder={
          generateLoading
            ? "Membuat No. Registrasi..."
            : "Click icon disamping untuk membuat No. Registrasi"
        }
        InputProps={{
          readOnly: true,
          endAdornment: (
            <Tooltip
              title={
                <TooltipTitle
                  title="Generate"
                  content="Click untuk membuat No. Registrasi"
                />
              }
            >
              <InputAdornment
                position="end"
                onClick={generateRegNumber}
                sx={{
                  cursor: "pointer",
                }}
              >
                <CachedIcon />
              </InputAdornment>
            </Tooltip>
          ),
        }}
        value={values.registrationNumber}
        error={isError("registrationNumber")}
        helperText={
          helperText("registrationNumber")
            ? "Click tombol generate untuk membuat nomor registrasi"
            : "Nomor registrasi siswa, click tombol generate untuk membuat nomor registrasi"
        }
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
          {genderSelectList.map((value) => (
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
        url="/schools"
        error={Boolean(errors.schoolId)}
        helperText={helperText("schoolId") ?? "Silahkan pilih asal sekolah"}
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
        url="/major"
        error={Boolean(errors.majorId)}
        label="Jurusan yang dipilih"
        helperText={
          helperText("majorId") ?? "Silahkan pilih jurusan yang akan dipilih"
        }
        onChange={(value) => {
          setFieldValue("majorId", value);
        }}
      />
    </FormLayout>
  );
};

export default AddStudentPage;
