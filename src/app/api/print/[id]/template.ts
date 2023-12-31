import { Template } from "@pdfme/generator";
import { basePDF } from "./base";

const PDFTemplate: Template = {
  schemas: [
    {
      refNumber: {
        type: "text",
        position: {
          x: 51.92,
          y: 43.19,
        },
        width: 132.63,
        height: 3.82,
        alignment: "left",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      registrationNumber: {
        type: "text",
        position: {
          x: 52.07,
          y: 48.78,
        },
        width: 132.63,
        height: 3.82,
        alignment: "left",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      payer: {
        type: "text",
        position: {
          x: 51.89,
          y: 54.02,
        },
        width: 132.63,
        height: 3.82,
        alignment: "left",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      nominal: {
        type: "text",
        position: {
          x: 51.97,
          y: 59.08,
        },
        width: 132.63,
        height: 3.82,
        alignment: "left",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      description: {
        type: "text",
        position: {
          x: 52.05,
          y: 64.14,
        },
        width: 132.63,
        height: 3.82,
        alignment: "left",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      student: {
        type: "text",
        position: {
          x: 10.46,
          y: 72.97,
        },
        width: 178.4,
        height: 4.87,
        alignment: "center",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      nominalBottom: {
        type: "text",
        position: {
          x: 10.09,
          y: 83.04,
        },
        width: 51.13,
        height: 3.53,
        alignment: "center",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      date: {
        type: "text",
        position: {
          x: 43.9,
          y: 104.1,
        },
        width: 51.13,
        height: 3.53,
        alignment: "left",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      dateAndPlace: {
        type: "text",
        position: {
          x: 136.45,
          y: 90.54,
        },
        width: 52.45,
        height: 3.53,
        alignment: "center",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
      administrator: {
        type: "text",
        position: {
          x: 135.87,
          y: 110.42,
        },
        width: 52.98,
        height: 3.53,
        alignment: "center",
        fontSize: 10,
        characterSpacing: 0,
        lineHeight: 1,
        fontName: "Roboto",
      },
    },
  ],
  basePdf: basePDF,
};

export default PDFTemplate;
