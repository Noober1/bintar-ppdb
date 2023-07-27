import { FormikErrors, FormikTouched } from "formik";

const formikCustomHelper = <T extends object>(
  errors: FormikErrors<T>,
  touched: FormikTouched<T>
) => {
  return {
    isError: (field: keyof T) => {
      return Boolean(errors[field]) && Boolean(touched[field]);
    },
    helperText: (field: keyof T) =>
      Boolean(errors[field]) && Boolean(touched[field])
        ? (errors[field] as string)
        : undefined,
  };
};

export default formikCustomHelper;
