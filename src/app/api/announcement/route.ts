import { extendedPrisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";
import { PaginationResult } from "prisma-paginate";

export const revalidate = 600;
export const dynamic = "force-dynamic";

const mapAnnoucementResult = ({
  result,
  page,
  hasNextPage,
}: PaginationResult) => {
  return {
    data: result,
    metadata: {
      page,
      hasNextPage,
    },
  };
};

export const GET: RequestHandler = async (request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("pageSize") || "10");
  const getData = await extendedPrisma.annoucement.paginate({
    page,
    limit,
    orderBy: {
      date: "desc",
    },
  });
  return NextResponse.json(mapAnnoucementResult(getData));
};
