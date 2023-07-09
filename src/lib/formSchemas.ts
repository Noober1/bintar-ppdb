import { ROLES } from "@/constants/roles";
import msg from "@/constants/scheme";
import { GENDERS, SCHOOL_TYPES } from "@prisma/client";
import * as yup from "yup";

export const loginForm = yup.object({
  email: yup.string().required(msg.EMPTY_EMAIL).email(msg.INVALID_EMAIL_FORMAT),
  password: yup.string().required(msg.EMPTY_PASSWORD),
});

export const userForm = (mode: "add" | "edit" = "add") => {
  const password =
    mode === "add" ? yup.string().required(msg.EMPTY_PASSWORD) : yup.string();
  return yup.object({
    email: yup
      .string()
      .email(msg.INVALID_EMAIL_FORMAT)
      .required(msg.EMPTY_EMAIL),
    fullname: yup.string().required(msg.EMPTY_DATA),
    password: password,
    repeatPassword: password,
    grantedAccess: yup.array<ROLES[]>().required(msg.EMPTY_DATA),
  });
};

export const majorForm = yup.object({
  initial: yup
    .string()
    .required(msg.EMPTY_DATA)
    .min(2, msg.INVALID_MINLENGTH(2))
    .max(10, msg.INVALID_MAXLENGTH(10)),
  name: yup.string().required(msg.EMPTY_DATA),
});

export const schoolForm = yup.object({
  NPSN: yup
    .number()
    .min(1, msg.INVALID_NUM_MIN(1))
    .max(999999, msg.INVALID_NUM_MAX(999999))
    .required(msg.EMPTY_DATA)
    .typeError("Data harus berupa angka"),
  type: yup.string<SCHOOL_TYPES>().required(msg.EMPTY_DATA),
  name: yup.string().required(msg.EMPTY_DATA),
  address: yup.string().required(msg.EMPTY_DATA),
});

export const configurationForm = yup.object({
  year: yup
    .number()
    .min(2000, msg.INVALID_NUM_MIN(2000))
    .max(
      new Date().getFullYear(),
      msg.INVALID_NUM_MAX(new Date().getFullYear())
    )
    .required(msg.EMPTY_DATA),
  registrationFormat: yup.string(),
});

export const basicForm = (mode: "add" | "edit") => {
  const regNumber = yup.string();
  const registrationNumber =
    mode === "add" ? regNumber.required(msg.EMPTY_DATA) : regNumber;
  return yup.object({
    registrationNumber,
    firstName: yup.string().required(msg.EMPTY_DATA),
    lastName: yup.string(),
    phoneNumber: yup
      .string()
      .required(msg.EMPTY_DATA)
      .min(10, msg.INVALID_MINLENGTH(10))
      .max(17, msg.INVALID_MAXLENGTH(17)),
    email: yup
      .string()
      .email(msg.INVALID_EMAIL_FORMAT)
      .required(msg.EMPTY_DATA),
    birthplace: yup.string().required(msg.EMPTY_DATA),
    birthdate: yup.date(),
    gender: yup.string<GENDERS>().required(msg.EMPTY_DATA),
    NISNNumber: yup.string().required(msg.EMPTY_DATA),
    schoolId: yup.number().required(msg.EMPTY_DATA),
    schoolGraduateYear: yup
      .number()
      .min(1980, msg.INVALID_NUM_MIN(1980))
      .max(
        new Date().getFullYear(),
        msg.INVALID_NUM_MAX(new Date().getFullYear())
      ),
    majorId: yup.number().required(msg.EMPTY_DATA),
  });
};

export const administrationForm = (mode: "add" | "edit") => {
  return yup.object({
    description: yup.string().required(msg.EMPTY_DATA),
    payer: yup.string().required(msg.EMPTY_DATA),
    nominal: yup
      .number()
      .min(1, msg.INVALID_NUM_MIN(1))
      .max(99999999, msg.INVALID_NUM_MAX(99999999))
      .typeError("Data harus berupa angka"),
  });
};
