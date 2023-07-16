import { getSchoolList } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 10;

const GET: RequestHandler = async () => {
  try {
    const getData = await getSchoolList();

    return NextResponse.json(getData);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "unknown error",
      },
      {
        status: 500,
      }
    );
  }
};

export { GET };
