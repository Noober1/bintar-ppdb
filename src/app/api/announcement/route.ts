import { extendedPrisma } from "@/lib/prisma";
import { mapPaginateResult } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const revalidate = 600;
export const dynamic = "force-dynamic";

export const GET: RequestHandler = async (request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("pageSize") || "10");
  const getData = await extendedPrisma.announcement.paginate({
    page,
    limit,
    orderBy: {
      date: "desc",
    },
  });
  return NextResponse.json(mapPaginateResult(getData));
};
