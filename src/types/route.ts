import { FormikHelpers } from "formik";
import { NextResponse } from "next/server";

export type RequestHandler = (
  request: Request,
  ...args: any
) => Promise<NextResponse<any>>;

export type HandleFormSubmit<T extends unknown> = (
  values: T,
  actions: FormikHelpers<T>
) => void;
