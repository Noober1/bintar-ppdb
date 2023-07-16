import { tableList, TableParams } from "@/types/table";
import deleteRoute from "./delete";
import handler from "./handler";
import { sendErrorResponse } from "@/lib/serverUtils";
import { TableRequestHandler } from "@/types/route";

const GET: TableRequestHandler = async (
  request,
  { params: { table: endpoint } }
) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("length") || "5");
  try {
    if (!tableList.includes(endpoint)) {
      throw new Error("Endpoint not found");
    }

    if (typeof handler[endpoint] === "undefined") {
      throw new Error("Endpoint invalid");
    }
    return await handler[endpoint](request, page, pageSize, searchParams);
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { GET, deleteRoute as POST };
