import { NextResponse } from "next/server";
import { tableList, TableMainHandler, TableList } from "@/types/table";
import deleteRoute from "./delete";
import handler from "./handler";

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
    return await handler[endpoint](request, page, pageSize, searchParams);
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

export { GET, deleteRoute as POST };
