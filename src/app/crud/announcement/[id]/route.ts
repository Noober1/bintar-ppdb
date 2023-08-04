import { announcementForm } from "@/lib/formSchemas";
import { prisma } from "@/lib/prisma";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";
import { getSessionUser, getSessionUserRoles } from "@/lib/session";
import { CrudRequestHandler } from "@/types/route";
import { NextResponse } from "next/server";

export const PUT: CrudRequestHandler = async (request, url) => {
  try {
    const id = parseInt(url.params.id);
    const user = await getSessionUser();
    if (!user) throw new RouteExceptionError("User not found", 404);
    const roles = await getSessionUserRoles();
    if (!roles) throw new RouteExceptionError("User roles not found", 404);
    const getRequestData = await request.json();
    const data = await announcementForm.validate(getRequestData);
    const findAnnouncement = await prisma.announcement.findUnique({
      where: { id },
    });
    if (!findAnnouncement)
      throw new RouteExceptionError("Announcement not found", 404);
    if (roles.type === "ADMINISTRATOR" && user.id !== findAnnouncement.authorId)
      throw new RouteExceptionError("Cannot edit other user announcement");

    const updating = await prisma.announcement.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      result: updating,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
};
