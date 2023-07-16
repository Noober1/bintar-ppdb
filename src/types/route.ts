import { FormikHelpers } from "formik";
import { NextResponse, NextRequest } from "next/server";
import { TableList } from "./table";

export type RequestHandler = (
  request: NextRequest,
  ...args: any
) => Promise<NextResponse<any>>;

export type TableRequestHandler = (
  request: NextRequest,
  params: {
    params: { table: TableList };
  }
) => Promise<NextResponse<any>>;

export type CrudRequestHandler<T = string> = (
  request: NextRequest,
  url: { params: { id: T } }
) => Promise<NextResponse<any>>;

export type HandleFormSubmit<T extends unknown> = (
  values: T,
  actions: FormikHelpers<T>
) => void;
