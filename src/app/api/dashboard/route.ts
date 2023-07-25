import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/routeUtils";
import { getCurrentConfig } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

const GET: RequestHandler = async (request) => {
  try {
    const user = await prisma.user.count({ where: { type: "USER" } });
    const major = await prisma.major.count();
    const school = await prisma.school.count();
    const config = await prisma.config.count();
    const basicData = {
      user,
      major,
      school,
      config,
    };

    const currentConfig = await getCurrentConfig();
    if (!currentConfig) {
      return NextResponse.json({
        basicData,
        currentConfig,
      });
    }

    const { id } = currentConfig;

    const student = await prisma.student.count({ where: { configId: id } });
    const registeredStudent = await prisma.student.count({
      where: { configId: id, isRegistered: true },
    });
    const administration = await prisma.administration.count({
      where: {
        student: {
          configId: id,
        },
      },
    });
    const administrationIncome = await prisma.administration.aggregate({
      _sum: {
        nominal: true,
      },
      where: {
        student: {
          configId: id,
        },
      },
    });
    const file = await prisma.student.count({
      where: { fileEdited: true, configId: id },
    });
    const kesiswaan = await prisma.student.count({
      where: { historyEdited: true, configId: id },
    });
    const measure = await prisma.student.count({
      where: { measureEdited: true, configId: id },
    });
    const biodata = await prisma.student.count({
      where: { bioEdited: true, configId: id },
    });

    return NextResponse.json({
      basicData,
      currentConfig: {
        year: currentConfig.year,
        student,
        registeredStudent,
        administration,
        administrationIncome: administrationIncome._sum.nominal,
        file,
        kesiswaan,
        measure,
        biodata,
      },
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { GET };
