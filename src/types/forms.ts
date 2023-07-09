import { ROLES } from "@/constants/roles";
import { GENDERS, SCHOOL_TYPES, Student } from "@prisma/client";

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

export interface ConfigurationFormValues {
  year: number;
  registrationFormat: string;
}

export interface StudentFormValues {
  registrationNumber?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthplace: string;
  birthdate: Date;
  gender: GENDERS;
  NISNNumber: string;
  schoolId?: number;
  schoolGraduateYear: number;
  majorId?: number;
}

export interface AdministrationFormValues {
  description: string;
  payer: string;
  nominal: number;
}
