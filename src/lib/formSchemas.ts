import { ROLES } from "@/constants/roles";
import msg from "@/constants/scheme";
import {
  bloodRhesusSelectList,
  bloodTypeSelectList,
  checkFields,
  familyStatusSelectList,
  gainInformationFromOptions,
  genderSelectList,
  parentSchoolOptions,
  religionSelectList,
  schoolOptions,
  sizes,
} from "@/types/forms";
import * as yup from "yup";

export const loginForm = yup.object({
  email: yup.string().required(msg.EMPTY_EMAIL).email(msg.INVALID_EMAIL_FORMAT),
  password: yup.string().required(msg.EMPTY_PASSWORD),
});

const rolesList: ROLES[] = [
  "administration",
  "basic",
  "bio",
  "config",
  "files",
  "kesiswaan",
  "major",
  "school",
  "uniform",
  "user",
];

export const userForm = (mode: "add" | "edit") => {
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
    grantedAccess: yup
      .array()
      .of(yup.string())
      .test("roles-validation", "Invalid roles", function (value) {
        if (!value) {
          return this.createError({ message: "Invalid roles" });
        }
        const invalidRoles = value.filter(
          (role) => !rolesList.includes(role as ROLES)
        );
        return (
          invalidRoles.length === 0 ||
          this.createError({ message: "Invalid roles" })
        );
      }),
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
    .typeError(msg.INVALID_TYPE_NUM),
  type: yup.string().oneOf(schoolOptions).required(msg.EMPTY_DATA),
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
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  registrationFormat: yup
    .string()
    .test("registration-number-validation", "Invalid data", function (value) {
      // if undefined, it's okay
      if (typeof value === "undefined") {
        return true;
      }
      // if value is "", this is okay
      if (value.length === 0) {
        return true; // Condition 1: Empty string is valid
      }
      // regex that must contain [Y] AND [N], if matched then the data is valid
      const regex = /(?=.*\[Y])(?=.*\[N])/g;
      if (regex.test(value)) {
        return true;
      }
      // If not meet any conditions above, the data is invalid
      return this.createError({ message: msg.INVALID_REGISTRATION_FORMAT });
    }),
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
    gender: yup
      .string()
      .oneOf(genderSelectList.map((value) => value.name))
      .required(msg.EMPTY_DATA),
    NISNNumber: yup.string().required(msg.EMPTY_DATA),
    schoolId: yup
      .number()
      .required(msg.EMPTY_DATA)
      .typeError(msg.INVALID_TYPE_NUM),
    schoolGraduateYear: yup
      .number()
      .min(1980, msg.INVALID_NUM_MIN(1980))
      .max(
        new Date().getFullYear(),
        msg.INVALID_NUM_MAX(new Date().getFullYear())
      )
      .required(msg.EMPTY_DATA)
      .typeError(msg.INVALID_TYPE_NUM),
    majorId: yup
      .number()
      .required(msg.EMPTY_DATA)
      .typeError(msg.INVALID_TYPE_NUM),
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
      .typeError(msg.INVALID_TYPE_NUM),
  });
};

export const filesForm = yup.object({
  id: yup.number().required(msg.EMPTY_DATA).typeError(msg.INVALID_TYPE_NUM),
  value: yup.boolean().required(msg.EMPTY_DATA).typeError(msg.INVALID_TYPE_NUM),
  field: yup.string().oneOf(checkFields).required(msg.EMPTY_DATA),
});

export const kesiswaanForm = yup.object({
  parentPhoneNumber: yup.string().required(msg.EMPTY_DATA),
  address: yup.string().required(msg.EMPTY_DATA),
  extracurricular: yup.string(),
  height: yup
    .number()
    .min(50, msg.INVALID_NUM_MIN(50))
    .max(999, msg.INVALID_NUM_MAX(999))
    .typeError(msg.INVALID_TYPE_NUM),
  weight: yup
    .number()
    .min(20, msg.INVALID_NUM_MIN(20))
    .max(200, msg.INVALID_NUM_MAX(200))
    .typeError(msg.INVALID_TYPE_NUM),
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
    .string()
    .oneOf(sizes)
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
  secondaryUniformSize: yup
    .string()
    .oneOf(sizes)
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
  gymUniformSize: yup
    .string()
    .oneOf(sizes)
    .typeError(msg.INVALID_TYPE)
    .required(msg.EMPTY_DATA),
  shoeSize: yup
    .number()
    .min(10, msg.INVALID_NUM_MIN(10))
    .max(60, msg.INVALID_NUM_MAX(60))
    .typeError(msg.INVALID_TYPE_NUM)
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
  gender: yup
    .string()
    .oneOf(genderSelectList.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  birthplace: yup.string().required(msg.EMPTY_DATA),
  birthdate: yup.date().typeError(msg.INVALID_TYPE),
  religion: yup
    .string()
    .oneOf(religionSelectList.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  nationality: yup.string().required(msg.EMPTY_DATA),
  birthPosition: yup
    .number()
    .min(1, msg.INVALID_NUM_MIN(1))
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  siblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  bloodRelatedSiblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  stepSiblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  fosterSiblingCount: yup
    .number()
    .max(50, msg.INVALID_NUM_MAX(50))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  familyStatus: yup
    .string()
    .oneOf(familyStatusSelectList.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  motherLanguage: yup.string(),
  schoolId: yup.number().required(),
  schoolGraduateYear: yup
    .number()
    .min(1980, msg.INVALID_NUM_MIN(1980))
    .max(
      new Date().getFullYear(),
      msg.INVALID_NUM_MAX(new Date().getFullYear())
    )
    .typeError(msg.INVALID_TYPE_NUM),
  address: yup.string(),
  email: yup.string().email(),
  livingWith: yup.string(),
  schoolDistance: yup
    .number()
    .min(1, msg.INVALID_NUM_MIN(1))
    .required(msg.EMPTY_DATA)
    .typeError(msg.INVALID_TYPE_NUM),
  height: yup
    .number()
    .min(50, msg.INVALID_NUM_MIN(50))
    .max(999, msg.INVALID_NUM_MAX(999))
    .typeError(msg.INVALID_TYPE_NUM),
  weight: yup
    .number()
    .min(20, msg.INVALID_NUM_MIN(20))
    .max(200, msg.INVALID_NUM_MAX(200))
    .typeError(msg.INVALID_TYPE_NUM),
  bloodType: yup
    .string()
    .oneOf(bloodTypeSelectList.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  bloodRhesus: yup
    .string()
    .oneOf(bloodRhesusSelectList.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  relapsingIllness: yup.string(),
  seriousIllness: yup.string(),
  majorId: yup.number().typeError(msg.INVALID_TYPE_NUM),
  fatherFullname: yup.string(),
  motherFullname: yup.string(),
  fatherBirthdate: yup.date(),
  motherBirthdate: yup.date(),
  fatherNationality: yup.string(),
  motherNationality: yup.string(),
  fatherLastEducation: yup
    .string()
    .oneOf(parentSchoolOptions.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  motherLastEducation: yup
    .string()
    .oneOf(parentSchoolOptions.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  fatherJob: yup.string(),
  motherJob: yup.string(),
  fatherIncome: yup.number().typeError(msg.INVALID_TYPE_NUM),
  motherIncome: yup.number().typeError(msg.INVALID_TYPE_NUM),
  fatherAddress: yup.string(),
  motherAddress: yup.string(),
  gainInformationFrom: yup
    .string()
    .oneOf(gainInformationFromOptions.map((value) => value.name))
    .required(msg.EMPTY_DATA),
  extracurricular: yup.string(),
});

// change password
export const changePasswordForm = yup.object({
  oldPassword: yup.string().required(msg.EMPTY_PASSWORD),
  password: yup.string().required(msg.EMPTY_PASSWORD),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], msg.MISMATCH_PASSWORD)
    .required(msg.EMPTY_DATA),
});

export const changeNameForm = yup.object({
  fullName: yup.string().required(msg.EMPTY_DATA),
});
