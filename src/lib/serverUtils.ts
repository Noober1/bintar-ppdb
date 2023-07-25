import { getServerSession } from "next-auth";
import nextAuthOptions from "@/lib/nextAuthOption";
import { prisma } from "./prisma";
import { ValidationError } from "yup";
import { NextResponse } from "next/server";
import {
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { HttpStatusCode } from "axios";

export const generateRandomNumber = (): string => {
  const min = 1;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const formattedNumber = randomNumber.toString().padStart(4, "0");
  return formattedNumber;
};

export const generateRegistrationNumber = async () => {
  const getConfig = await checkConfigOrThrow();
  const getUserData = await getServerSession(nextAuthOptions);
  const year = new Date().getFullYear().toString();
  const userId = getUserData?.user.id
    ? getUserData.user.id.toString().padStart(2, "0")
    : "00";

  const regNumber = getConfig.registrationFormat
    .replace("[Y]", year)
    .replace("[I]", userId)
    .replace("[N]", generateRandomNumber());

  const getUserByGeneratedRegistrationNumber = await prisma.student.count({
    where: { registrationNumber: regNumber },
  });

  if (getUserByGeneratedRegistrationNumber) {
    await generateRegistrationNumber();
  } else {
    return regNumber;
  }
};

export const getCurrentConfig = async () => {
  const getData = await prisma.config.findFirst({
    where: {
      isActive: true,
    },
  });

  return getData;
};
export const checkConfigOrThrow = async () => {
  const getActiveConfig = await getCurrentConfig();
  if (!getActiveConfig) {
    throw new Error("Tidak ada config yang aktif");
  }

  return getActiveConfig;
};

export const getMajorList = async () => {
  const getData = await prisma.major.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return getData.map((value) => ({
    name: value.id,
    label: value.name,
  }));
};

export const getSchoolList = async () => {
  const getData = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return getData.map((value) => ({
    name: value.id,
    label: value.name,
  }));
};

export const numberToCurrency = (value: number): string => {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};
