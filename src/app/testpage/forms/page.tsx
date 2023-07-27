"use client";
import React from "react";
import DatePicker from "@/components/inputs/DatePicker";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ServersideSelect from "@/components/inputs/ServersideSelect";
import RowRadioGroup from "@/components/forms/RowRadioGroup";
import { GENDERS } from "@prisma/client";
import { setOpen } from "@/lib/redux/multiDialog";
import { useDispatch } from "react-redux";

interface FormValues {
  date: Date;
  schoolId: number;
  gender: GENDERS;
}
const initialValues: FormValues = {
  date: new Date(),
  schoolId: 0,
  gender: "MALE",
};

const Page = () => {
  const dispatch = useDispatch();
  const { handleSubmit, setFieldValue, handleChange, values } = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(
        setOpen({
          title: "Hasil",
          content: JSON.stringify(values),
          showCancelButton: true,
        })
      );
    },
  });

  return (
    <div className="p-5">
      <Typography gutterBottom>Forms</Typography>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
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
        <RowRadioGroup
          label="Row radio Group"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          options={[
            { label: "Pria", name: "MALE" },
            { label: "Wanita", name: "FEMALE" },
          ]}
          helperText="Helper text"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Page;
