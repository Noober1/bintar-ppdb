import { prisma } from "./prisma";
import { dataFetcher } from "./utils";
import { RouteExceptionError } from "./routeUtils";
import { HttpStatusCode } from "axios";
import { getSessionUser } from "@/lib/session";
import { PaginationResult } from "prisma-paginate";

export const generateRandomNumber = (): string => {
  const min = 1;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const formattedNumber = randomNumber.toString().padStart(4, "0");
  return formattedNumber;
};

type RegistrationNumberType = "default" | "online";

export const generateRegistrationNumber = async (
  type: RegistrationNumberType = "default"
) => {
  const getConfig = await checkConfigOrThrow();
  const getUserData = await getSessionUser();
  const year = new Date().getFullYear().toString();
  const userId = getUserData
    ? getUserData.id.toString().padStart(2, "0")
    : "00";

  const regNumber = getConfig.registrationFormat
    .replace("[Y]", year)
    .replace("[I]", type == "online" ? "ONLINE" : userId)
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

export const verifyCaptcha = async (token: string): Promise<boolean> => {
  const { CAPTCHA_SECRET_KEY, CAPTCHA_SITE_KEY, CAPTCHA_SITE_URL } =
    process.env;
  if (!CAPTCHA_SECRET_KEY || !CAPTCHA_SITE_KEY || !CAPTCHA_SITE_URL)
    throw new RouteExceptionError(
      "CAPTCHA configuration not found",
      HttpStatusCode.InternalServerError
    );

  const params = new URLSearchParams();
  params.append("secret", CAPTCHA_SECRET_KEY);
  params.append("response", token);
  const url = `${CAPTCHA_SITE_URL}?${params.toString()}`;
  const verify = await dataFetcher({
    url,
    method: "POST",
  });
  if (!verify.success)
    throw new RouteExceptionError(
      "Invalid captcha",
      HttpStatusCode.Unauthorized
    );

  return true;
};

export const mapPaginateResult = ({ result, ...rest }: PaginationResult) => {
  return {
    data: result,
    metadata: {
      ...rest,
    },
  };
};
