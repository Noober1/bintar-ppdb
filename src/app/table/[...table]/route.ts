import { NextResponse } from "next/server";
import {
  tableList,
  Handler,
  TableMainHandler,
  Params,
  TableList,
} from "@/types/table";
import { extendedPrisma, prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";

const GET: TableMainHandler = async (request, param) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("length") || "5");
  const {
    params: { table },
  } = param;
  try {
    const endpoint = table[0] as TableList;
    if (!tableList.includes(endpoint)) {
      throw new Error("Endpoint not found");
    }

    if (typeof handler[endpoint] === "undefined") {
      throw new Error("Endpoint invalid");
    }
    return await handler[endpoint](request, page, pageSize);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Unknown Error",
    });
  }
};

// handler for delete selected data from table
const POST: RequestHandler = async (request, params: Params) => {
  try {
    const getDataRequest = await request.json();
    const endpoint = params.params.table[0] as TableList;
    switch (endpoint) {
      case "user":
        await prisma.user.deleteMany({
          where: {
            id: {
              in: getDataRequest.data,
            },
            type: {
              not: "ADMINISTRATOR",
            },
          },
        });
        break;
      case "major":
        if (isNaN(parseInt(getDataRequest.data))) {
          throw new Error("Invalid data");
        }

        await prisma.major.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      case "school":
        if (isNaN(parseInt(getDataRequest.data))) {
          throw new Error("Invalid data");
        }

        await prisma.school.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
      case "configuration":
        const findStudentByYear = await prisma.student.count({
          where: {
            year: {
              id: getDataRequest.data,
            },
          },
        });
        if (findStudentByYear) {
          throw new Error("Ada data siswa yang berkaitan dengan data ini");
        }

        await prisma.config.delete({
          where: {
            id: getDataRequest.data,
          },
        });
        break;
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus",
      },
      {
        status: 500,
      }
    );
  }
};

// handler
const handler: Handler = {
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
    const getData = await extendedPrisma.config.paginate({
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
    // const getData = await extendedPrisma.student.paginate({
    //   select: {
    //     id: true,
    //     registrationNumber: true,
    //     firstName: true,
    //     lastName: true,
    //     isRegistered: true,
    //   },
    //   limit,
    //   page,
    // });
    // return NextResponse.json({
    //   data: getData.result,
    //   metadata: {
    //     page: getData.page,
    //     length: getData.limit,
    //     count: getData.count,
    //     totalPages: getData.totalPages,
    //     hasNextPage: getData.hasNextPage,
    //   },
    // });
    // const findStudentByYear = await prisma.student.count({
    //   where: {
    //     year: {
    //       year: 2023,
    //     },
    //   },
    // });
    // return NextResponse.json({
    //   data: findStudentByYear,
    // });
  },
};

export { GET, POST };
