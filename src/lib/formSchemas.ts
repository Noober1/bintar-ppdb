import { ROLES } from "@/constants/roles";
import msg from "@/constants/scheme";
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
