import { FormikHelpers } from "formik";
import { NextResponse, NextRequest } from "next/server";

export type RequestHandler = (
  request: NextRequest,
  ...args: any
) => Promise<NextResponse<any>>;

export type HandleFormSubmit<T extends unknown> = (
  values: T,
  actions: FormikHelpers<T>
) => void;
