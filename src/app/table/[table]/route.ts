import { tableList } from "@/types/table";
import deleteRoute from "./delete";
import handler from "./handler";
import { sendErrorResponse, RouteExceptionError } from "@/lib/routeUtils";
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
      throw new RouteExceptionError("Endpoint not found");
    }

    if (typeof handler[endpoint] === "undefined") {
      throw new RouteExceptionError("Endpoint invalid");
    }
    return await handler[endpoint](request, page, pageSize, searchParams);
  } catch (error) {
    return sendErrorResponse(error);
  }
};

export { GET, deleteRoute as POST };
