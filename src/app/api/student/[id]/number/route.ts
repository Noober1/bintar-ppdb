import updateStudentById from "@/lib/apiRoute/studentUpdater";
import { onlineNumberForm } from "@/lib/formSchemas";
import { sendErrorResponse } from "@/lib/routeUtils";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const getData = await request.json();
    const data = await onlineNumberForm.validate(getData);

    const updating = await updateStudentById(url.params.id, {
      ...data,
      numberEdited: true,
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
