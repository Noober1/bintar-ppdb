export type Params = {
  params: {
    table: string;
  };
};
export type TableMainHandler = (request: Request, params: Params) => any;

export const tableList = [
  "user",
  "major",
  "school",
  "configuration",
  "administration",
  "basic",
] as const;
export type TableList = (typeof tableList)[number];

export type Handler = {
  [key in TableList]: (
    request: Request,
    page: number,
    pageSize: number,
    ...args: any[]
  ) => any;
};
