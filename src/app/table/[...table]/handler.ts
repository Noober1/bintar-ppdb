import { extendedPrisma, prisma } from "@/lib/prisma";
import { Handler } from "@/types/table";
import { NextResponse } from "next/server";

const tableHandler: Handler = {
  user: async (_request, page, limit) => {
    const getData = await extendedPrisma.user.paginate({
      limit,
      page,
      select: {
        id: true,
        email: true,
        fullname: true,
        grantedAccess: true,
      },
      where: {
        type: {
          not: "ADMINISTRATOR",
        },
      },
    });
    return NextResponse.json({
      data: getData.result,
      metadata: {
        page: getData.page,
        length: getData.limit,
        count: getData.count,
        totalPages: getData.totalPages,
        hasNextPage: getData.hasNextPage,
      },
    });
  },
  administration: async (request) => {
    const getData = await prisma.major.findMany();
    return NextResponse.json({
      data: getData,
    });
  },
  configuration: async (_request, page, limit) => {
    let mapData: unknown;
    const getData = await extendedPrisma.config.paginate({
      limit,
      page,
      select: {
        id: true,
        isActive: true,
        registrationFormat: true,
        year: true,
        _count: {
          select: {
            Student: true,
          },
        },
      },
    });

    if (getData.result.length > 0) {
      mapData = getData.result.map((value) => ({
        id: value.id,
        isActive: value.isActive,
        registrationFormat: value.registrationFormat,
        year: value.year,
        studentCount: value._count.Student,
      }));
    }

    return NextResponse.json({
      data: getData.result.length > 0 ? mapData : [],
      metadata: {
        page: getData.page,
        length: getData.limit,
        count: getData.count,
        totalPages: getData.totalPages,
        hasNextPage: getData.hasNextPage,
      },
    });
  },
  major: async (_request, page, limit) => {
    const getData = await extendedPrisma.major.paginate({
      limit,
      page,
    });
    return NextResponse.json({
      data: getData.result,
      metadata: {
        page: getData.page,
        length: getData.limit,
        count: getData.count,
        totalPages: getData.totalPages,
        hasNextPage: getData.hasNextPage,
      },
    });
  },
  school: async (_request, page, limit) => {
    const getData = await extendedPrisma.school.paginate({
      limit,
      page,
    });

    return NextResponse.json({
      data: getData.result,
      metadata: {
        page: getData.page,
        length: getData.limit,
        count: getData.count,
        totalPages: getData.totalPages,
        hasNextPage: getData.hasNextPage,
      },
    });
  },
  basic: async (_request, page, limit) => {},
};

export default tableHandler;
