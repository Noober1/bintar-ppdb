import { ROLES } from "@/constants/roles";
import { SCHOOL_TYPES } from "@prisma/client";

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

export const schoolOptions: SCHOOL_TYPES[] = ["SMP", "MTS"];

export interface SchoolFormValues {
  NPSN: number;
  type: SCHOOL_TYPES;
  name: string;
  address: string;
}
