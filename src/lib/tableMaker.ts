import { Style, Workbook, Worksheet } from "excel4node";
import { centerCenter, allThickBorder, allThinBorder } from "./excelStyles";
import { NextResponse } from "next/server";

const textAlignList = ["center", "left", "right"] as const;

type TextAlign = {
  [key in (typeof textAlignList)[number]]: Style["alignment"];
};

const textAlign: TextAlign = {
  center: {
    horizontal: "center",
    vertical: "center",
  },
  left: {
    horizontal: "left",
    vertical: "center",
  },
  right: {
    horizontal: "right",
    vertical: "center",
  },
};

interface TableHeaders {
  field: string;
  label: string;
  width: number;
  textAlign?: keyof typeof textAlign;
}

interface TableContent {
  [key: string]: string | number | Date;
}

interface ExcelMakerOptions {
  headers: TableHeaders[];
  content: TableContent[];
  startRow?: number;
  worksheetName?: string;
  fileName?: string;
}

export default class ExcelMaker {
  private workbook: Workbook;
  worksheet: Worksheet;
  readonly startRow: number;
  readonly headers: TableHeaders[];
  readonly content: TableContent[];
  readonly lastRow: number;
  readonly lastColumn: number;
  readonly textCenter: Style;
  readonly allBorder: Style;
  readonly allThickBorder: Style;
  readonly fileName: string;
  constructor(parameters: ExcelMakerOptions) {
    this.fileName = parameters.fileName || "excel";
    this.headers = parameters.headers;
    this.workbook = new Workbook();
    this.worksheet = this.workbook.addWorksheet(
      parameters.worksheetName || "Sheet 1"
    );
    this.startRow = parameters.startRow || 4;
    this.content = parameters.content;
    this.lastRow = this.content.length + this.startRow;
    this.lastColumn = this.headers.length;
    this.textCenter = this.workbook.createStyle({
      alignment: centerCenter,
    });
    this.allBorder = this.workbook.createStyle({
      border: allThinBorder,
    });
    this.allThickBorder = this.workbook.createStyle({
      border: allThickBorder,
    });

    this.headers.forEach((item, index) => {
      this.worksheet.cell(this.startRow, index + 1).string(item.label);
      this.worksheet.column(index + 1).setWidth(item.width);
    });

    this.headers.forEach((headerName, headerIndex) => {
      const currentColumnPosition = headerIndex + 1;
      let currentRowPosition = this.startRow + 1;

      this.content.forEach((contentItem) => {
        const currentCell = this.worksheet.cell(
          currentRowPosition,
          currentColumnPosition
        );
        const value = contentItem[headerName.field];
        if (typeof value == "number") {
          currentCell.number(value as number);
        } else if (typeof value == "string") {
          currentCell.string(value as string);
        } else if (value instanceof Date) {
          currentCell.date(value);
        }
        currentCell.style({
          alignment: textAlign[headerName.textAlign || "left"],
        });
        currentRowPosition += 1;
      });
    });

    // adding table border
    this.worksheet
      .cell(
        this.startRow,
        1,
        this.startRow + this.content.length,
        this.headers.length
      )
      .style({
        border: allThinBorder,
      });
    this.worksheet
      .cell(this.startRow, 1, this.startRow, this.lastColumn)
      .style(this.allThickBorder);
  }

  writeToBuffer(): Promise<Buffer> {
    return this.workbook.writeToBuffer();
  }

  async sendAsResponse() {
    const buffer = await this.writeToBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.ms-excel",
        "Content-Disposition": `inline; filename="${this.fileName}.xlsx"`,
      },
    });
  }
}
