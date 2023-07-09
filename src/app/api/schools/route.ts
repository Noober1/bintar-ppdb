import { prisma } from "@/lib/prisma";
import { RequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

const GET: RequestHandler = async () => {
  const getData = await prisma.school.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(
    getData.map((value) => ({
      name: value.id,
      label: value.name,
    }))
  );
};

export { GET };
