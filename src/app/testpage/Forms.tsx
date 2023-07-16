"use client";
import React from "react";
import DatePicker from "@/components/inputs/DatePicker";
import { Formik, FormikHelpers } from "formik";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ServersideSelect from "@/components/inputs/ServersideSelect";

interface FormValues {
  date: Date;
  schoolId: number;
}
const initialValues: FormValues = {
  date: new Date(),
  schoolId: 0,
};

const submitForm = (values: FormValues, actions: FormikHelpers<FormValues>) => {
  console.log(values);
};

const Forms = () => {
  return (
    <>
      <Typography gutterBottom>Forms</Typography>
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        {({ values, setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="grid grid-cols-2">
            <DatePicker
              label="Date Picker"
              helperText="Silahkan pilih tanggalnya"
              onChange={(values) => {
                setFieldValue("date", values);
              }}
              value={values.date}
            />
            <ServersideSelect
              url="/api/schools"
              label="Server-side select"
              onChange={(value) => {
                setFieldValue("schoolId", value);
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Forms;
