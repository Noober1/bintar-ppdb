"use client";
import React, { FC, useRef } from "react";
import { BioDataForEdit } from "./page";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import {
  BioFormValues,
  bloodRhesusSelectList,
  bloodTypeSelectList,
  familyStatusSelectList,
  gainInformationFromOptions,
  genderSelectList,
  parentSchoolOptions,
  religionSelectList,
} from "@/types/forms";
import FormLayout from "@/components/layouts/FormLayout";
import formikCustomHelper from "@/hooks/formikCustomHelper";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import DatePicker from "@/components/inputs/DatePicker";
import ServersideSelect, {
  ServerSideSelectHandles,
} from "@/components/inputs/ServersideSelect";
import RowRadioGroup from "@/components/forms/RowRadioGroup";
import SelectForm from "@/components/forms/SelectForm";
import InputAdornment from "@mui/material/InputAdornment";
import { bioForm } from "@/lib/formSchemas";
import { AxiosError } from "axios";
import useRefresh from "@/hooks/useRefresh";

interface EditBioPageProps {
  data: BioDataForEdit;
}

const initialFormValues = (data: BioDataForEdit): BioFormValues => ({
  NISNNumber: data?.NISNNumber || "",
  KIPKPSNumber: data?.KIPKPSNumber || "",
  examNumber: data?.examNumber || "",
  ijazahNumber: data?.ijazahNumber || "",
  SKHUNNumber: data?.SKHUNNumber || "",
  phoneNumber: data?.phoneNumber || "",
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  nickName: data?.nickName || "",
  gender: data?.gender || "MALE",
  birthplace: data?.birthplace || "",
  birthdate: data?.birthdate || new Date(),
  religion: data?.religion || "ISLAM",
  nationality: data?.nationality || "",
  birthPosition: data?.birthPosition || 1,
  siblingCount: data?.siblingCount || 0,
  stepSiblingCount: data?.stepSiblingCount || 0,
  fosterSiblingCount: data?.fosterSiblingCount || 0,
  bloodRelatedSiblingCount: data?.bloodRelatedSiblingCount || 0,
  familyStatus: data?.familyStatus || "KANDUNG",
  motherLanguage: data?.motherLanguage || "",
  schoolId: data?.schoolId || 0,
  schoolGraduateYear: data?.schoolGraduateYear || new Date().getFullYear(),
  address: data?.address || "",
  email: data?.email || "",
  livingWith: data?.livingWith || "",
  schoolDistance: data?.schoolDistance || 0,
  height: data?.height || 0,
  weight: data?.weight || 0,
  bloodType: data?.bloodType || "A",
  bloodRhesus: data?.bloodRhesus || "UNKNOWN",
  relapsingIllness: data?.relapsingIllness || "",
  seriousIllness: data?.seriousIllness || "",
  majorId: data?.majorId || 0,
  fatherFullname: data?.fatherFullname || "",
  fatherBirthdate: data?.fatherBirthdate || new Date(),
  fatherNationality: data?.fatherNationality || "Indonesia",
  fatherLastEducation: data?.fatherLastEducation || "S1",
  fatherJob: data?.fatherJob || "",
  fatherAddress: data?.fatherAddress || "",
  fatherIncome: data?.fatherIncome || 0,
  motherAddress: data?.motherAddress || "",
  motherIncome: data?.motherIncome || 0,
  motherFullname: data?.motherFullname || "",
  motherBirthdate: data?.motherBirthdate || new Date(),
  motherNationality: data?.motherNationality || "Indonesia",
  motherLastEducation: data?.motherLastEducation || "S1",
  motherJob: data?.motherJob || "",
  extracurricular: data?.extracurricular || "",
  gainInformationFrom: data?.gainInformationFrom || "PRESENTATION",
});

const FormDivider: FC<{ label: string }> = ({ label }) => (
  <Divider className="md:col-span-2 lg:col-span-3">
    <Chip label={label} color="primary" />
  </Divider>
);

const EditBioPage = ({ data }: EditBioPageProps) => {
  useRefresh();
  const schoolRef = useRef<ServerSideSelectHandles>(null);
  const majorRef = useRef<ServerSideSelectHandles>(null);
  const mutation = useEditMutation(`/crud/bio/${data?.id}`);
  const { enqueueSnackbar } = useSnackbar();
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: initialFormValues(data),
    validationSchema: bioForm,
    onSubmit: ({ email, ...values }, actions) => {
      mutation.mutate(values, {
        onSuccess: () => {
          enqueueSnackbar(
            `Biodata siswa siswa ${
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
      alert="Silahkan sunting data dibawah ini"
      errors={errors}
      isSubmitting={isSubmitting}
      backButtonUrl="/home/bio"
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title="Sunting biodata siswa"
    >
      <FormDivider label="Nomor Identitas" />
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
      <TextField
        name="KIPKPSNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.KIPKPSNumber}
        error={isError("KIPKPSNumber")}
        helperText={
          helperText("KIPKPSNumber") ??
          "No. Kartu Indonesia(KIP)/Kartu Perlindungan Sosial(KPS)"
        }
        label="No. KIP/KPS"
      />
      <TextField
        name="examNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.examNumber}
        error={isError("examNumber")}
        helperText={helperText("examNumber") ?? "Contoh: 2-18-20-09-110-005-4"}
        label="No. Ujian nasional"
      />
      <TextField
        name="ijazahNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.ijazahNumber}
        error={isError("ijazahNumber")}
        helperText={
          helperText("ijazahNumber") ?? "No. Ijazah yang tertera pada ijazah"
        }
        label="No. Ijazah"
      />
      <TextField
        name="SKHUNNumber"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.SKHUNNumber}
        error={isError("SKHUNNumber")}
        helperText={
          helperText("SKHUNNumber") ??
          "No. Surat Keterangan Hasil Ujian Nasional(SKHUN)"
        }
        label="No. SKHUN"
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
      <FormDivider label="Identitas Dasar" />
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
        name="nickName"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.nickName}
        error={isError("nickName")}
        helperText={helperText("nickName") ?? "Nama panggilan siswa"}
        label="Nama panggilan"
      />
      <RowRadioGroup
        helperText="Pilih salah satu jenis kelamin"
        name="gender"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.gender}
        label="Jenis kelamin"
        options={genderSelectList}
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
      <SelectForm
        helperText="Pilih agama, pilih lainnya jika tidak ada"
        options={religionSelectList}
        name="religion"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.religion}
        label="Agama"
      />
      <TextField
        name="nationality"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.nationality}
        error={isError("nationality")}
        helperText={
          helperText("nationality") ?? "Silahkan isi kebangsaan siswa"
        }
        label="Kebangsaan"
      />

      <TextField
        name="birthPosition"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.birthPosition}
        error={isError("birthPosition")}
        helperText={
          helperText("birthPosition") ??
          "Posisi kelahiran pada keluarga. Isi 1 jika siswa adalah anak pertama, dsb."
        }
        label="Posisi kelahiran"
      />
      <TextField
        name="siblingCount"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.siblingCount}
        error={isError("siblingCount")}
        helperText={
          helperText("siblingCount") ??
          "Jumlah saudara pada keluarga(termasuk saudara tiri, angkat, dsb)"
        }
        label="Jumlah saudara"
      />
      <TextField
        name="bloodRelatedSiblingCount"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.bloodRelatedSiblingCount}
        error={isError("bloodRelatedSiblingCount")}
        helperText={
          helperText("bloodRelatedSiblingCount") ??
          "Jumlah saudara kandung(tidak termasuk siswa)"
        }
        label="Jumlah saudara kandung"
      />
      <TextField
        name="stepSiblingCount"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.stepSiblingCount}
        error={isError("stepSiblingCount")}
        helperText={
          helperText("stepSiblingCount") ??
          "Jumlah saudara tiri(tidak termasuk saudara angkat)"
        }
        label="Jumlah saudara tiri"
      />
      <TextField
        name="fosterSiblingCount"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.fosterSiblingCount}
        error={isError("fosterSiblingCount")}
        helperText={
          helperText("fosterSiblingCount") ??
          "Jumlah saudara angkat yang dimiliki"
        }
        label="Jumlah saudara angkat"
      />
      <SelectForm
        name="familyStatus"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.familyStatus}
        label="Status keluarga"
        helperText="Pilih status siswa di keluarga"
        options={familyStatusSelectList}
      />
      <TextField
        name="motherLanguage"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.motherLanguage}
        error={isError("motherLanguage")}
        helperText={
          helperText("motherLanguage") ?? "Bahasa yang sering digunakan dirumah"
        }
        label="Bahasa ibu"
      />
      <ServersideSelect
        ref={schoolRef}
        initialValue={values.schoolId}
        url="/schools"
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
        url="/major"
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
      <TextField
        name="address"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address}
        error={isError("address")}
        helperText={
          helperText("address") ??
          "Alamat lengkap siswa(tempat tinggal saat ini)"
        }
        label="Alamat"
      />
      <FormDivider label="Informasi tambahan siswa" />
      <TextField
        name="email"
        value={values.email}
        error={isError("email")}
        helperText={helperText("email") ?? "Email tidak bisa diganti"}
        label="Surel/Email"
        disabled
      />
      <TextField
        name="livingWith"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.livingWith}
        error={isError("livingWith")}
        helperText={
          helperText("livingWith") ??
          "Contoh: Tinggal bersama orang tua, sendiri, dsb."
        }
        label="Tinggal bersama..."
      />
      <TextField
        name="schoolDistance"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.schoolDistance}
        error={isError("schoolDistance")}
        helperText={
          helperText("schoolDistance") ??
          "Jarak dari rumah ke SMK Bina Taruna(dalam satuan kilometer), isi 1 jika dibawah 1KM."
        }
        label="Jarak sekolah"
      />
      <TextField
        name="height"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.height}
        error={isError("height")}
        helperText={
          helperText("height") ?? "Tinggi badan siswa dalam satuan centimeter"
        }
        label="Tinggi badan(CM)"
      />
      <TextField
        name="weight"
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.weight}
        error={isError("weight")}
        helperText={
          helperText("weight") ?? "Berat badan siswa dalam satuan kilogram"
        }
        label="Berat badan(KG)"
      />
      <SelectForm
        name="bloodType"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.bloodType}
        label="Status keluarga"
        helperText="Pilih golongan darah"
        options={bloodTypeSelectList}
      />
      <RowRadioGroup
        name="bloodRhesus"
        label="Rhesus darah"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.bloodRhesus}
        options={bloodRhesusSelectList}
        helperText="Pilih rhesus darah"
      />
      <TextField
        name="relapsingIllness"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.relapsingIllness}
        error={isError("relapsingIllness")}
        helperText={
          helperText("relapsingIllness") ??
          "Tulis penyakit yang sering kambuh, kosongkan jika tidak ada"
        }
        label="Penyakit kambuhan"
      />
      <TextField
        name="seriousIllness"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.seriousIllness}
        error={isError("seriousIllness")}
        helperText={
          helperText("seriousIllness") ??
          "Tulis penyakit yang berat yang pernah/sedang diderita, kosongkan jika tidak ada"
        }
        label="Penyakit berat"
      />
      <SelectForm
        name="gainInformationFrom"
        label="Informasi sekolah"
        helperText="Sumber informasi yang didapat tentang SMK Bina Taruna"
        options={gainInformationFromOptions}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.gainInformationFrom}
      />
      <TextField
        name="extracurricular"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.extracurricular}
        error={isError("extracurricular")}
        helperText={
          helperText("extracurricular") ??
          "Ekstrakurikuler siswa yang pernah diikuti."
        }
        label="Ekstrakurikuler"
      />
      <FormDivider label="Informasi ayah/wali" />
      <TextField
        name="fatherFullname"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.fatherFullname}
        error={isError("fatherFullname")}
        helperText={helperText("fatherFullname") ?? "Nama lengkap ayah/wali"}
        label="Nama lengkap"
      />
      <DatePicker
        onChange={(value) => {
          setFieldValue("fatherBirthdate", value);
        }}
        value={values.fatherBirthdate}
        helperText="Tanggal lahir ayah/wali"
        label="Tanggal lahir"
      />
      <TextField
        name="fatherNationality"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.fatherNationality}
        error={isError("fatherNationality")}
        helperText={helperText("fatherNationality") ?? "Kebangsaan ayah/wali"}
        label="Kebangsaan"
      />
      <SelectForm
        name="fatherLastEducation"
        label="Pendidikan terakhir"
        value={values.fatherLastEducation}
        onChange={handleChange}
        onBlur={handleBlur}
        options={parentSchoolOptions}
        helperText="Jenjang pendidikan terakhir ayah"
      />
      <TextField
        name="fatherJob"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.fatherJob}
        error={isError("fatherJob")}
        helperText={helperText("fatherJob") ?? "Pekerjaan ayah/wali saat ini"}
        label="Pekerjaan"
      />
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        }}
        type="number"
        name="fatherIncome"
        label="Penghasil per bulan"
        helperText={
          helperText("fatherIncome") ?? "Silahkan isi jumlah penghasilan ayah"
        }
        value={values.fatherIncome}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError("fatherIncome")}
      />
      <TextField
        name="fatherAddress"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.fatherAddress}
        error={isError("fatherAddress")}
        helperText={
          helperText("fatherAddress") ?? "Alamat ayah/wali saat ini tinggal"
        }
        label="Alamat"
      />
      <FormDivider label="Informasi ibu/wali" />
      <TextField
        name="motherFullname"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.motherFullname}
        error={isError("motherFullname")}
        helperText={helperText("motherFullname") ?? "Nama lengkap ibu/wali"}
        label="Nama lengkap"
      />
      <DatePicker
        onChange={(value) => {
          setFieldValue("motherBirthdate", value);
        }}
        value={values.motherBirthdate}
        helperText="Tanggal lahir ibu/wali"
        label="Tanggal lahir"
      />
      <TextField
        name="motherNationality"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.motherNationality}
        error={isError("motherNationality")}
        helperText={helperText("motherNationality") ?? "Kebangsaan ibu/wali"}
        label="Kebangsaan"
      />
      <SelectForm
        name="motherLastEducation"
        label="Pendidikan terakhir"
        value={values.motherLastEducation}
        onChange={handleChange}
        onBlur={handleBlur}
        options={parentSchoolOptions}
        helperText="Jenjang pendidikan terakhir ibu"
      />
      <TextField
        name="motherJob"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.motherJob}
        error={isError("motherJob")}
        helperText={helperText("motherJob") ?? "Pekerjaan ibu/wali saat ini"}
        label="Pekerjaan"
      />
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        }}
        type="number"
        name="motherIncome"
        label="Penghasil per bulan"
        helperText={
          helperText("motherIncome") ?? "Silahkan isi jumlah penghasilan ibu"
        }
        value={values.motherIncome}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isError("motherIncome")}
      />
      <TextField
        name="motherAddress"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.motherAddress}
        error={isError("motherAddress")}
        helperText={
          helperText("motherAddress") ?? "Alamat ibu/wali saat ini tinggal"
        }
        label="Alamat"
      />
    </FormLayout>
  );
};

export default EditBioPage;
