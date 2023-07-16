"use client";

import SwitchTwoLabel from "@/components/forms/SwitchTwoLabel";
import FormLayout from "@/components/layouts/FormLayout";
import { kesiswaanForm } from "@/lib/formSchemas";
import { KesiswaanFormValues } from "@/types/forms";
import { useFormik } from "formik";
import React from "react";
import { KesiswaanDataForEdit } from "./page";
import TextField from "@mui/material/TextField";
import formikCustomHelper from "@/hooks/formikCustomHelper";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useEditMutation } from "@/hooks/useAddMutation";
import { useSnackbar } from "notistack";
import useRefresh from "@/hooks/useRefresh";

interface KesiswaanEditPageProps {
  data: KesiswaanDataForEdit;
}

const EditKesiswaanPage = ({ data }: KesiswaanEditPageProps) => {
  useRefresh();
  const mutation = useEditMutation("/crud/kesiswaan/" + data?.id);
  const { enqueueSnackbar } = useSnackbar();

  const initialFormValues: KesiswaanFormValues = {
    address: data?.address || "",
    extracurricular: data?.extracurricular || "",
    haveADate: data?.haveADate ?? true,
    haveDrunked: data?.haveDrunked ?? false,
    relapsingIllness: data?.relapsingIllness ?? "",
    seriousIllness: data?.seriousIllness ?? "",
    haveFought: data?.haveFought ?? true,
    haveJoinedCriminalGang: data?.haveJoinedCriminalGang ?? false,
    haveSkipLesson: data?.haveSkipLesson ?? true,
    haveTattoo: data?.haveTattoo ?? false,
    haveTruancy: data?.haveTruancy ?? true,
    haveWatchedPorn: data?.haveWatchedPorn ?? false,
    height: data?.height || 0,
    isDrug: data?.isDrug ?? false,
    isIlliterate: data?.isIlliterate ?? true,
    isPierced: data?.isPierced ?? false,
    isSmoker: data?.isSmoker ?? false,
    parentPhoneNumber: data?.parentPhoneNumber || "",
    weight: data?.weight || 0,
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    isSubmitting,
  } = useFormik({
    initialValues: initialFormValues,
    validationSchema: kesiswaanForm,
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

  const { isError, helperText } = formikCustomHelper(errors, touched);
  return (
    <FormLayout
      backButtonUrl="/home/kesiswaan"
      alert={
        <>
          Menyunting siswa <kbd>{data?.firstName + " " + data?.lastName}</kbd>
        </>
      }
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      submitButtonLabel="Simpan perubahan"
      title="Sunting data siswa"
    >
      <TextField
        name="parentPhoneNumber"
        error={isError("parentPhoneNumber")}
        helperText={
          helperText("parentPhoneNumber") ??
          "No. Telpon atau No. HandPhone orang tua siswa"
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.parentPhoneNumber}
        label="No. HP/Telpon orang tua"
      />
      <TextField
        name="address"
        error={isError("address")}
        helperText={helperText("address") ?? "Alamat lengkap siswa saat ini"}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address}
        label="Alamat siswa"
      />
      <TextField
        name="extracurricular"
        error={isError("extracurricular")}
        helperText={
          helperText("extracurricular") ?? "Ekstrakurikuler yang pernah diikuti"
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.extracurricular}
        label="Extrakurikuler"
      />
      <TextField
        name="height"
        type="number"
        error={isError("height")}
        helperText={
          helperText("height") ??
          "Tinggi badan siswa dalam statuan centimeter(CM)"
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.height}
        label="Tinggi badan"
      />
      <TextField
        name="weight"
        type="number"
        error={isError("weight")}
        helperText={
          helperText("weight") ?? "Berat badan siswa dalam statuan kilogram(KG)"
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.weight}
        label="Berat badan"
      />
      <TextField
        name="relapsingIllness"
        error={isError("relapsingIllness")}
        helperText={
          helperText("relapsingIllness") ??
          "Kosongkan jika tidak ada penyakit kambuhan"
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.relapsingIllness}
        label="Penyakit kambuhan"
      />
      <TextField
        name="seriousIllness"
        error={isError("seriousIllness")}
        helperText={
          helperText("seriousIllness") ??
          "Kosongkan jika mempunyai riwayat penyakit berat"
        }
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.seriousIllness}
        label="Penyakit berat"
      />
      <Divider
        className="md:col-span-2 lg:col-span-3"
        component="div"
        role="presentation"
      >
        <Chip label="Daftar check" color="primary" />
      </Divider>
      <SwitchTwoLabel
        name="haveSkipLesson"
        label="Apakah pernah kabur pada saat jam pelajaran?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveSkipLesson}
      />
      <SwitchTwoLabel
        name="haveTruancy"
        label="Apakah pernah bolos?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveTruancy}
      />
      <SwitchTwoLabel
        name="haveDrunked"
        label="Apakah pernah minum miras?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveDrunked}
      />
      <SwitchTwoLabel
        name="haveFought"
        label="Apakah pernah berkelahi?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveFought}
      />
      <SwitchTwoLabel
        name="haveJoinedCriminalGang"
        label="Apakah pernah mengikuti geng motor?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveJoinedCriminalGang}
      />
      <SwitchTwoLabel
        name="haveWatchedPorn"
        label="Apakah pernah nonton video porno?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveWatchedPorn}
      />
      <SwitchTwoLabel
        name="haveADate"
        label="Apakah pernah pacaran?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveADate}
      />
      <SwitchTwoLabel
        name="haveTattoo"
        label="Apakah mempunyai tato?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.haveTattoo}
      />
      <SwitchTwoLabel
        name="isSmoker"
        label="Apakah pernah merokok?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.isSmoker}
      />
      <SwitchTwoLabel
        name="isPierced"
        label="Apakah pernah ditindik?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.isPierced}
      />
      <SwitchTwoLabel
        name="isDrug"
        label="Apakah pernah mengonsumsi narkoba?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.isDrug}
      />
      <SwitchTwoLabel
        name="isIlliterate"
        label="Apakah buta huruf?"
        onBlur={handleBlur}
        onChange={handleChange}
        checked={values.isIlliterate}
      />
    </FormLayout>
  );
};

export default EditKesiswaanPage;
