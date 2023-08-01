import updateStudentById from "@/lib/apiRoute/studentUpdater";
import { onlineAdditionalForm } from "@/lib/formSchemas";
import { sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const getData = await request.json();
    const data = await onlineAdditionalForm.validate(getData);

    const updating = await updateStudentById(url.params.id, {
      ...data,
      additionalEdited: true,
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
