import { schoolForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { sendErrorResponse } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

type Params = {
  params: {
    schoolId: string;
  };
};

const PUT: RequestHandler = async (
  request,
  { params: { schoolId } }: Params
) => {
  try {
    const id = parseInt(schoolId[0]);
    const getRequestData = await request.json();
    const validatedData = await schoolForm.validate(getRequestData);
    const findData = await prisma.school.count({
      where: {
        id,
      },
    });

    if (!findData) {
      throw new Error("Sekolah tidak ditemukan");
    }

    // find school with different id and same NPSN
    const findWithSameNPSN = await prisma.school.count({
      where: {
        id: {
          not: id,
        },
        NPSN: validatedData.NPSN,
      },
    });
    if (findWithSameNPSN) {
      throw new Error("Ada sekolah yang menggunakan NPSN yang sama");
    }

    const updateData = await prisma.school.update({
      where: {
        id,
      },
      data: {
        address: validatedData.address,
        name: validatedData.name,
        NPSN: validatedData.NPSN,
        type: validatedData.type,
      },
    });

    return NextResponse.json({
      success: true,
      result: updateData,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { PUT };
