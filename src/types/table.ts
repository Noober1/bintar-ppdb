export type TableParams = {
  params: {
    table: TableList;
  };
};

export const tableList = [
  "user",
  "major",
  "school",
  "configuration",
  "administration",
  "basic",
  "files",
  "kesiswaan",
  "measure",
  "bio",
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
