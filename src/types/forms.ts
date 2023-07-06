import { ROLES } from "@/constants/roles";

export interface UserFormValues {
  email: string;
  fullname: string;
  password: string;
  repeatPassword: string;
  grantedAccess: ROLES[];
}

export interface MajorFormValues {
  initial: string;
  name: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
