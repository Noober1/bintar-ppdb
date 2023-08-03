"use client";
import { FormikConfig, useFormik } from "formik";
import formikCustomHelper from "./formikCustomHelper";

const useForm = <T extends object>(options: FormikConfig<T>) => {
  const formik = useFormik(options);
  const customMethod = formikCustomHelper(formik.errors, formik.touched);
  return {
    ...formik,
    ...customMethod,
  };
};

export default useForm;
