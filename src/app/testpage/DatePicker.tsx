"use client";
import React from "react";
import Picker from "@/components/inputs/DatePicker";
import { Formik, FormikHelpers } from "formik";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface FormValues {
  date: Date;
}
const initialValues: FormValues = {
  date: new Date(),
};

const submitForm = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  console.log(values);
};

const DatePicker = () => {
  return (
    <>
      <Typography gutterBottom>Date Picker</Typography>
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        {({ values, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Picker
              label="Entahlah"
              helperText="Silahkan pilih tanggalnya"
              onChange={(values) => {
                setFieldValue("date", values);
              }}
              value={values.date}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DatePicker;
