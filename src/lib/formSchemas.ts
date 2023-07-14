import { ROLES } from "@/constants/roles";
import msg from "@/constants/scheme";
import {
  BLOOD_RHESUS,
  BLOOD_TYPES,
  FAMILY_STATUSES,
  GAIN_INFO_FROM,
  GENDERS,
  RELIGIONS,
  SCHOOL_TYPES,
  SIZES,
  Student,
} from "@prisma/client";
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
  registrationFormat: yup
    .string()
    .matches(/(?=.*\[Y])(?=.*\[N])/g, msg.INVALID_REGISTRATION_FORMAT),
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
      .required(msg.EMPTY_DATA)
      .typeError("Data harus berupa angka"),
  });
};

export type CheckFields = Pick<
  Student,
  | "fileAkta"
  | "fileIjazah"
  | "fileKIPKPS"
  | "fileKK"
  | "fileKTP"
  | "fileMCU"
  | "fileNISN"
  | "filePhoto23"
  | "filePhoto34"
  | "fileRaport"
  | "fileSKB"
  | "fileSKHUN"
  | "fileSTK"
>;

export const filesForm = yup.object({
  id: yup.number().required(msg.EMPTY_DATA).typeError(msg.INVALID_TYPE),
  value: yup.boolean().required(msg.EMPTY_DATA).typeError(msg.INVALID_TYPE),
  field: yup.string<keyof CheckFields>().required(msg.EMPTY_DATA),
});

export const kesiswaanForm = yup.object({
  parentPhoneNumber: yup.string().required(msg.EMPTY_DATA),
  address: yup.string().required(msg.EMPTY_DATA),
  extracurricular: yup.string(),
  height: yup
    .number()
    .min(50, msg.INVALID_NUM_MIN(50))
    .max(999, msg.INVALID_NUM_MAX(999)),
  weight: yup
    .number()
    .min(20, msg.INVALID_NUM_MIN(20))
    .max(200, msg.INVALID_NUM_MAX(200)),
  relapsingIllness: yup.string(),
  seriousIllness: yup.string(),
  haveSkipLesson: yup.boolean().required(msg.EMPTY_DATA),
  haveTruancy: yup.boolean().required(msg.EMPTY_DATA),
  haveDrunked: yup.boolean().required(msg.EMPTY_DATA),
  haveFought: yup.boolean().required(msg.EMPTY_DATA),
  haveJoinedCriminalGang: yup.boolean().required(msg.EMPTY_DATA),
  haveWatchedPorn: yup.boolean().required(msg.EMPTY_DATA),
  haveADate: yup.boolean().required(msg.EMPTY_DATA),
  haveTattoo: yup.boolean().required(msg.EMPTY_DATA),
  isSmoker: yup.boolean().required(msg.EMPTY_DATA),
  isPierced: yup.boolean().required(msg.EMPTY_DATA),
  isDrug: yup.boolean().required(msg.EMPTY_DATA),
  isIlliterate: yup.boolean().required(msg.EMPTY_DATA),
});

export const measureForm = yup.object({
  primaryUniformSize: yup
    .string<SIZES>()
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
  secondaryUniformSize: yup
    .string<SIZES>()
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
  gymUniformSize: yup
    .string<SIZES>()
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
  shoeSize: yup
    .number()
    .min(10, msg.INVALID_NUM_MIN(10))
    .max(60, msg.INVALID_NUM_MAX(60))
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
});

export const bioForm = yup.object({
  NISNNumber: yup.string().required(msg.EMPTY_DATA),
  KIPKPSNumber: yup.string(),
  examNumber: yup.string(),
  ijazahNumber: yup.string(),
  SKHUNNumber: yup.string(),
  phoneNumber: yup.string().required(msg.EMPTY_DATA),
  firstName: yup.string().required(msg.EMPTY_DATA),
  lastName: yup.string(),
  nickName: yup.string(),
  gender: yup.string<GENDERS>().required(msg.EMPTY_DATA),
  birthplace: yup.string().required(msg.EMPTY_DATA),
  birthdate: yup.date().typeError(msg.INVALID_TYPE),
  religion: yup.string<RELIGIONS>().required(msg.EMPTY_DATA),
  nationality: yup.string().required(msg.EMPTY_DATA),
  birthPosition: yup
    .number()
    .min(1, msg.INVALID_NUM_MIN(1))
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE),
  siblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE),
  bloodRelatedSiblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE),
  stepSiblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE),
  fosterSiblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE),
  familyStatus: yup.string<FAMILY_STATUSES>().required(msg.EMPTY_DATA),
  motherLanguage: yup.string(),
  schoolId: yup.number().required(),
  schoolGraduateYear: yup
    .number()
    .min(1980, msg.INVALID_NUM_MIN(1980))
    .max(
      new Date().getFullYear(),
      msg.INVALID_NUM_MAX(new Date().getFullYear())
    ),
  address: yup.string(),
  email: yup.string().email(),
  livingWith: yup.string(),
  schoolDistance: yup
    .number()
    .min(1, msg.INVALID_NUM_MIN(1))
    .required(msg.EMPTY_DATA),
  height: yup
    .number()
    .min(50, msg.INVALID_NUM_MIN(50))
    .max(999, msg.INVALID_NUM_MAX(999)),
  weight: yup
    .number()
    .min(20, msg.INVALID_NUM_MIN(20))
    .max(200, msg.INVALID_NUM_MAX(200)),
  bloodType: yup.string<BLOOD_TYPES>().required(msg.EMPTY_DATA),
  bloodRhesus: yup.string<BLOOD_RHESUS>().required(msg.EMPTY_DATA),
  relapsingIllness: yup.string(),
  seriousIllness: yup.string(),
  majorId: yup.number(),
  fatherFullname: yup.string(),
  motherFullname: yup.string(),
  fatherBirthdate: yup.date(),
  motherBirthdate: yup.date(),
  fatherNationality: yup.string(),
  motherNationality: yup.string(),
  fatherLastEducation: yup.string<SCHOOL_TYPES>().required(msg.EMPTY_DATA),
  motherLastEducation: yup.string<SCHOOL_TYPES>().required(msg.EMPTY_DATA),
  fatherJob: yup.string(),
  motherJob: yup.string(),
  fatherIncome: yup.number(),
  motherIncome: yup.number(),
  fatherAddress: yup.string(),
  motherAddress: yup.string(),
  gainInformationFrom: yup.string<GAIN_INFO_FROM>().required(msg.EMPTY_DATA),
  extracurricular: yup.string(),
});
