import { generateRegistrationNumber } from "@/lib/serverUtils";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const GET: RequestHandler = async () => {
  try {
    const generateNumber = await generateRegistrationNumber();

    return NextResponse.json({
      success: true,
      registrationNumber: generateNumber,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: error instanceof Error ? 400 : 500,
      }
    );
  }
};

export { GET };
