import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const dataFetcher = <T>(
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

export { dataFetcher };
