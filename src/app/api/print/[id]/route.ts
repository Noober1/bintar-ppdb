import { prisma } from "@/lib/prisma";
import { CrudRequestHandler } from "@/types/route";
import { generate } from "@pdfme/generator";
import { NextResponse } from "next/server";
import PDFTemplate from "./template";
import { RouteExceptionError, sendErrorResponse } from "@/lib/routeUtils";

export const GET: CrudRequestHandler = async (request, { params: { id } }) => {
  try {
    const getAdministrationById = await prisma.administration.findFirst({
      where: { id },
      select: {
        id: true,
        student: {
          select: {
            registrationNumber: true,
            firstName: true,
            lastName: true,
            formerSchool: {
              select: {
                name: true,
              },
            },
          },
        },
        administrator: {
          select: {
            fullname: true,
          },
        },
        description: true,
        nominal: true,
        payer: true,
      },
    });
    if (!getAdministrationById)
      throw new RouteExceptionError("Administration data not found");

    const formatedNominal = getAdministrationById.nominal.toLocaleString(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
      }
    );

    const currentDate = new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const inputs = [
      {
        refNumber: getAdministrationById.id || "",
        registrationNumber:
          getAdministrationById.student.registrationNumber || "",
        payer: getAdministrationById.payer,
        nominal: formatedNominal,
        description: getAdministrationById.description,
        student:
          (getAdministrationById.student.firstName || "") +
          " " +
          (getAdministrationById.student.lastName || "") +
          `(${getAdministrationById.student.formerSchool?.name || ""})`,
        nominalBottom: formatedNominal,
        date: currentDate,
        dateAndPlace: `Jalancagak, ${currentDate}`,
        administrator: getAdministrationById.administrator.fullname || "",
      },
    ];

    const generatePDF = await generate({ template: PDFTemplate, inputs });

    return new NextResponse(generatePDF.buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-disposition": `inline;filename= "INVOICE-${getAdministrationById.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(error);
  }
};
