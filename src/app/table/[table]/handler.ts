import { getCurrentConfig, mapPaginateResult } from "@/lib/serverUtils";
import { extendedPrisma } from "@/lib/prisma";
import { Handler } from "@/types/table";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";

const tableHandler: Handler = {
  user: async (_request, page, limit) => {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({
        data: [],
      });
    }
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
        id: {
          not: session.id || 0,
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
  administration: async (request, page, limit, params: URLSearchParams) => {
    try {
      const getUserid = params.get("userid");
      if (!getUserid) {
        throw new RouteExceptionError("Request invalid");
      }
      const parseUserId = parseInt(getUserid);
      if (isNaN(parseUserId)) {
        throw new RouteExceptionError("Request invalid");
      }

      const getData = await extendedPrisma.administration.paginate({
        limit,
        page,
        where: {
          studentId: parseUserId,
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
    } catch (error) {
      const isErrorMessage = error instanceof Error;
      return NextResponse.json(
        {
          success: false,
          message: isErrorMessage ? error.message : "unknown error",
        },
        {
          status: isErrorMessage ? 400 : 500,
        }
      );
    }
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
  basic: async (_request, page, limit) => {
    try {
      const getActiveConfig = await getCurrentConfig();
      if (!getActiveConfig) {
        throw new RouteExceptionError("Tidak ada config yang aktif");
      }

      const getData = await extendedPrisma.student.paginate({
        page,
        limit,
        select: {
          id: true,
          registrationNumber: true,
          firstName: true,
          lastName: true,
          isRegistered: true,
          historyEdited: true,
          formerSchool: {
            select: {
              name: true,
            },
          },
        },
        where: {
          year: {
            id: getActiveConfig.id,
          },
        },
      });

      return NextResponse.json({
        data: getData.result.map((value) => ({
          id: value.id,
          registrationNumber: value.registrationNumber,
          firstName: value.firstName,
          lastName: value.lastName,
          isRegistered: value.isRegistered,
          formerSchool: value.formerSchool?.name,
        })),
        metadata: {
          page: getData.page,
          length: getData.limit,
          count: getData.count,
          totalPages: getData.totalPages,
          hasNextPage: getData.hasNextPage,
        },
      });
    } catch (error) {
      const isErrorMessage = error instanceof Error;
      return NextResponse.json(
        {
          message: isErrorMessage ? error.message : "Unknown error",
        },
        {
          status: isErrorMessage ? 400 : 500,
        }
      );
    }
  },
  files: async (request, page, limit) => {
    try {
      const getActiveConfig = await getCurrentConfig();
      if (!getActiveConfig) {
        throw new RouteExceptionError("Tidak ada config yang aktif");
      }
      const getData = await extendedPrisma.student.paginate({
        limit,
        page,
        where: {
          configId: getActiveConfig.id,
          isRegistered: true,
        },
        select: {
          id: true,
          registrationNumber: true,
          firstName: true,
          lastName: true,
          fileNISN: true,
          fileAkta: true,
          fileIjazah: true,
          fileKIPKPS: true,
          fileKK: true,
          fileKTP: true,
          fileMCU: true,
          filePhoto23: true,
          filePhoto34: true,
          fileRaport: true,
          fileSKB: true,
          fileSKHUN: true,
          fileSTK: true,
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
    } catch (error) {
      const isErrorMessage = error instanceof Error;
      return NextResponse.json(
        {
          message: isErrorMessage ? error.message : "Unknown error",
        },
        {
          status: isErrorMessage ? 400 : 500,
        }
      );
    }
  },
  kesiswaan: async (request, page, limit) => {
    try {
      const getActiveConfig = await getCurrentConfig();
      if (!getActiveConfig) {
        throw new RouteExceptionError("Tidak ada config yang aktif");
      }
      const getData = await extendedPrisma.student.paginate({
        page,
        limit,
        select: {
          id: true,
          formerSchool: {
            select: {
              name: true,
            },
          },
          firstName: true,
          lastName: true,
          registrationNumber: true,
          historyEdited: true,
        },
        orderBy: {
          historyEdited: "asc",
        },
        where: {
          isRegistered: true,
          configId: getActiveConfig.id,
        },
      });

      return NextResponse.json({
        data: getData.result.map((value) => ({
          ...value,
          formerSchool: value.formerSchool?.name,
        })),
        metadata: {
          page: getData.page,
          length: getData.limit,
          count: getData.count,
          totalPages: getData.totalPages,
          hasNextPage: getData.hasNextPage,
        },
      });
    } catch (error) {
      const isErrorMessage = error instanceof Error;
      return NextResponse.json(
        {
          message: isErrorMessage ? error.message : "Unknown error",
        },
        {
          status: isErrorMessage ? 400 : 500,
        }
      );
    }
  },
  measure: async (requets, page, limit) => {
    try {
      const getActiveConfig = await getCurrentConfig();
      if (!getActiveConfig) {
        throw new RouteExceptionError("Tidak ada config yang aktif");
      }

      const getData = await extendedPrisma.student.paginate({
        page,
        limit,
        where: {
          configId: getActiveConfig.id,
          isRegistered: true,
        },
        orderBy: {
          measureEdited: "asc",
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          registrationNumber: true,
          formerSchool: {
            select: {
              name: true,
            },
          },
          measureEdited: true,
        },
      });

      return NextResponse.json({
        data: getData.result.map((value) => ({
          ...value,
          formerSchool: value.formerSchool?.name,
        })),
        metadata: {
          page: getData.page,
          length: getData.limit,
          count: getData.count,
          totalPages: getData.totalPages,
          hasNextPage: getData.hasNextPage,
        },
      });
    } catch (error) {
      const isErrorMessage = error instanceof Error;
      return NextResponse.json(
        {
          message: isErrorMessage ? error.message : "Unknown error",
        },
        {
          status: isErrorMessage ? 400 : 500,
        }
      );
    }
  },
  bio: async (request, page, limit) => {
    try {
      const getActiveConfig = await getCurrentConfig();
      if (!getActiveConfig) {
        throw new RouteExceptionError("Tidak ada config yang aktif");
      }

      const getData = await extendedPrisma.student.paginate({
        page,
        limit,
        where: {
          configId: getActiveConfig.id,
          isRegistered: true,
        },
        orderBy: {
          bioEdited: "asc",
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          registrationNumber: true,
          formerSchool: {
            select: {
              name: true,
            },
          },
          bioEdited: true,
        },
      });

      return NextResponse.json({
        data: getData.result.map((value) => ({
          ...value,
          formerSchool: value.formerSchool?.name,
        })),
        metadata: {
          page: getData.page,
          length: getData.limit,
          count: getData.count,
          totalPages: getData.totalPages,
          hasNextPage: getData.hasNextPage,
        },
      });
    } catch (error) {
      return sendErrorResponse(error);
    }
  },
  announcement: async (request, page, limit) => {
    try {
      const getActiveConfig = await getCurrentConfig();
      if (!getActiveConfig)
        throw new RouteExceptionError("Tidak ada config yang aktif");

      const getData = await extendedPrisma.announcement.paginate({
        page,
        limit,
        orderBy: {
          date: "desc",
        },
      });

      return NextResponse.json(mapPaginateResult(getData));
    } catch (error) {
      return sendErrorResponse(error);
    }
  },
};

export default tableHandler;
