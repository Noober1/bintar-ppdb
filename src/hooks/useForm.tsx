"use client";
import { FormikConfig, useFormik } from "formik";

const useForm = <T extends object>(options: FormikConfig<T>) => {
  const formik = useFormik(options);
  return {
    ...formik,
    isError: (field: keyof T) =>
      Boolean(formik.errors[field]) && Boolean(formik.touched[field]),
    helperText: (field: keyof T) =>
      Boolean(formik.errors[field]) && Boolean(formik.touched[field])
        ? (formik.errors[field] as string)
        : undefined,
  };
};

export default useForm;
