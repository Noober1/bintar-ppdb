import { ROLES } from "@/constants/roles";
import {
  BLOOD_RHESUS,
  BLOOD_TYPES,
  FAMILY_STATUSES,
  GAIN_INFO_FROM,
  GENDERS,
  RELIGIONS,
  SCHOOL_TYPES,
  SIZES,
} from "@prisma/client";

export const checkFields = [
  "fileAkta",
  "fileIjazah",
  "fileKIPKPS",
  "fileKK",
  "fileKTP",
  "fileMCU",
  "fileNISN",
  "filePhoto23",
  "filePhoto34",
  "fileRaport",
  "fileSKB",
  "fileSKHUN",
  "fileSTK",
] as const;

export type CheckFields = (typeof checkFields)[number];

export interface FormSelectTypeFormat<T> {
  name: T;
  label: string;
}

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
export const parentSchoolOptions: FormSelectTypeFormat<SCHOOL_TYPES>[] = [
  { name: "SD", label: "Sekolah Dasar(SD)" },
  { name: "MI", label: "Madrasah Ibtidaiyah(MI)" },
  { name: "SMP", label: "Sekolah menengah pertama(SMP)" },
  { name: "MTS", label: "Madrasah Tsanawiyah(MTs)" },
  { name: "SMA", label: "Sekolah Menengah Atas(SMA)" },
  { name: "SMK", label: "Sekolah Menengah Kejuruan(SMK)" },
  { name: "MA", label: "Madrasah Aliyah(MA)" },
  { name: "S1", label: "Sarjana(S1)" },
  { name: "S2", label: "Magister(S2)" },
  { name: "S3", label: "doktoral(S3)" },
  { name: "D3", label: "Diploma 3(D3)" },
];
export const gainInformationFromOptions: FormSelectTypeFormat<GAIN_INFO_FROM>[] =
  [
    { name: "BANNER", label: "Spanduk, banner, dsb" },
    { name: "BROCHURE", label: "Brosur, pamflet, dsb" },
    { name: "PRESENTATION", label: "Presentasi pihak sekolah" },
    { name: "RADIO", label: "Radio" },
    { name: "TEACHER", label: "Guru dari sekolah asal" },
    { name: "OTHER", label: "Lainnya" },
  ];

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

export const genderSelectList: FormSelectTypeFormat<GENDERS>[] = [
  {
    label: "Laki-laki",
    name: "MALE",
  },
  {
    label: "Perempuan",
    name: "FEMALE",
  },
];

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

export interface KesiswaanFormValues {
  parentPhoneNumber: string;
  address: string;
  extracurricular: string;
  height: number;
  weight: number;
  relapsingIllness?: string;
  seriousIllness?: string;
  haveSkipLesson: boolean;
  haveTruancy: boolean;
  haveDrunked: boolean;
  haveFought: boolean;
  haveJoinedCriminalGang: boolean;
  haveWatchedPorn: boolean;
  haveADate: boolean;
  haveTattoo: boolean;
  isSmoker: boolean;
  isPierced: boolean;
  isDrug: boolean;
  isIlliterate: boolean;
}

export const sizes: SIZES[] = [
  "L",
  "M",
  "S",
  "XL",
  "XXL",
  "XXXL",
  "XXXXL",
  "XXXXXL",
  "XXXXXXL",
];

export const sizesSelectList: FormSelectTypeFormat<SIZES>[] = sizes.map(
  (value) => ({
    label: value,
    name: value,
  })
);

export interface MeasureFormValues {
  primaryUniformSize: SIZES;
  secondaryUniformSize: SIZES;
  gymUniformSize: SIZES;
  shoeSize: number;
}

export const religionSelectList: FormSelectTypeFormat<RELIGIONS>[] = [
  { label: "Islam", name: "ISLAM" },
  { label: "Kristen", name: "KRISTEN" },
  { label: "Hindu", name: "HINDU" },
  { label: "Budha", name: "BUDHA" },
  { label: "Katholik", name: "KATHOLIK" },
  { label: "Konghuchu", name: "KONGHUCHU" },
  { label: "Lainnya", name: "LAINNYA" },
];

export const familyStatusSelectList: FormSelectTypeFormat<FAMILY_STATUSES>[] = [
  { name: "ADOPSI", label: "Adopsi" },
  { name: "ANGKAT", label: "Anak angkat" },
  { name: "KANDUNG", label: "Anak kandung" },
  { name: "PIATU", label: "Anak piatu" },
  { name: "YATIM", label: "Anak yatim" },
  { name: "YATIM_PIATU", label: "Yatim piatu" },
  { name: "LAINNYA", label: "Lainnya" },
];

export const bloodTypeSelectList: FormSelectTypeFormat<BLOOD_TYPES>[] = [
  { name: "A", label: "Golongan darah A" },
  { name: "B", label: "Golongan darah B" },
  { name: "AB", label: "Golongan darah AB" },
  { name: "O", label: "Golongan darah O" },
];

export const bloodRhesusSelectList: FormSelectTypeFormat<BLOOD_RHESUS>[] = [
  { name: "MINUS", label: "Negatif" },
  { name: "PLUS", label: "Positif" },
  { name: "UNKNOWN", label: "Tidak diketahui" },
];

export interface BioFormValues {
  NISNNumber: string;
  KIPKPSNumber: string;
  examNumber: string;
  ijazahNumber: string;
  SKHUNNumber: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  nickName: string;
  gender: GENDERS;
  birthplace: string;
  birthdate: Date;
  religion: RELIGIONS;
  nationality: string;
  birthPosition: number;
  siblingCount: number;
  bloodRelatedSiblingCount: number;
  stepSiblingCount: number;
  fosterSiblingCount: number;
  familyStatus: FAMILY_STATUSES;
  motherLanguage: string;
  schoolId: number;
  schoolGraduateYear: number;
  address: string;
  email: string;
  livingWith: string;
  schoolDistance: number;
  height: number;
  weight: number;
  bloodType: BLOOD_TYPES;
  bloodRhesus: BLOOD_RHESUS;
  relapsingIllness: string;
  seriousIllness: string;
  majorId: number;
  fatherFullname: string;
  motherFullname: string;
  fatherBirthdate: Date;
  motherBirthdate: Date;
  fatherNationality: string;
  motherNationality: string;
  fatherLastEducation: SCHOOL_TYPES;
  motherLastEducation: SCHOOL_TYPES;
  fatherJob: string;
  motherJob: string;
  fatherIncome: number;
  motherIncome: number;
  fatherAddress: string;
  motherAddress: string;
  gainInformationFrom: GAIN_INFO_FROM;
  extracurricular: string;
}
