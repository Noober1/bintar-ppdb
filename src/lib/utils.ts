import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FormikHelpers } from "formik";
import { EnqueueSnackbar } from "notistack";

export const dataFetcher = <T>(
  args: string | AxiosRequestConfig<T>
): Promise<AxiosResponse["data"]> => {
  let fetch: Promise<AxiosResponse>;
  if (typeof args === "string") {
    fetch = axios.get(args);
  } else {
    fetch = axios(args);
  }

  return fetch.then((result) => result.data);
};

export const errorMutationHandler = <T = object>(
  error: unknown,
  snackbar: EnqueueSnackbar,
  actions: FormikHelpers<T>
) => {
  let message: string = "Tidak diketahui";
  if (error instanceof AxiosError) {
    if (error.response?.data.message) {
      message = error.response?.data.message;
    }
  }

  snackbar("Gagal disimpan, alasan: " + message, { variant: "error" });
  actions.setSubmitting(false);
};
