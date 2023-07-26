import { NextResponse, NextRequest } from "next/server";
import { TableList } from "./table";

type Response = Promise<NextResponse<any>>;

export type RequestHandler = (request: NextRequest, ...args: any) => Response;

export type TableRequestHandler = (
  request: NextRequest,
  params: {
    params: { table: TableList };
  }
) => Response;

export type CrudRequestHandler<T = string> = (
  request: NextRequest,
  url: { params: { id: T } }
) => Response;
