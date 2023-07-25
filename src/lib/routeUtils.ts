import {
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

export const sendErrorResponse = (error: unknown) => {
  console.error(error);
  let message: string = "Unknown error";
  let errors: string[] = [];
  const isValidationError = error instanceof ValidationError;
  const isErrorInstance = error instanceof Error;
  const isPrismaValidationError = error instanceof PrismaClientValidationError;
  const isPrismaUnknownError = error instanceof PrismaClientUnknownRequestError;
  const isRouteError = error instanceof RouteExceptionError;

  if (isValidationError || isErrorInstance || isRouteError) {
    message = error.message;
  }

  if (isPrismaValidationError) {
    message = "Error saving data, reason: SERVER_ERROR";
  }

  if (isValidationError) {
    errors = error.errors;
  }

  if (isPrismaUnknownError) {
    message = "Database error";
  }

  return NextResponse.json(
    {
      success: false,
      message,
      validationErrors: errors.length > 0 ? errors : undefined,
    },
    {
      status:
        message === "Unknown error" ? 500 : isRouteError ? error.status : 400,
    }
  );
};

export class RouteExceptionError extends Error {
  status: HttpStatusCode;
  constructor(message = "", status = HttpStatusCode.BadRequest) {
    super(message);
    this.name = "RouteExeptionError";
    this.status = status;
  }
}
