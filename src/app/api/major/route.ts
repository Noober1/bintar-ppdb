import { sendErrorResponse } from "@/lib/routeUtils";
import { getMajorList } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

const GET: RequestHandler = async () => {
  try {
    const getData = await getMajorList();

    return NextResponse.json(getData);
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { GET };
