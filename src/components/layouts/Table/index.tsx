"use client";
import { dataFetcher } from "@/lib/utils";
import { TableList } from "@/types/table";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import TableLoadingOverlay from "./TableLoadingOverlay";
import localizationTable from "./localizationTable";
import CustomToolbar, { CustomToolbarProps } from "./CustomToolbar";

declare module "@mui/x-data-grid" {
  // eslint-disable-next-line no-unused-vars
  interface ToolbarPropsOverrides extends CustomToolbarProps {}
}

interface IDynamicTable {
  endpoint: TableList;
  pageSize?: number;
  columns: GridColDef<any>[];
  additionalQuery?: {
    [key: string]: string;
  };
  buttons?: {
    customButton?: React.ReactNode;
    addButtonLink?: string;
    deleteButton?: TableList;
    deleteConfirmationNote?: React.ReactElement;
  };
  enableSearch?: boolean;
}

interface TableDataStructure {
  data: any[];
  metadata: {
    page: number;
    length: number;
    count: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface DynamicTableHandles {
  refreshTable: () => void;
  getSelectionIds: () => GridRowSelectionModel;
}

const pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100];

const DynamicTableContent = (
  {
    endpoint,
    pageSize = 10,
    columns,
    buttons,
    additionalQuery = {},
    enableSearch = false,
  }: IDynamicTable,
  ref: Ref<DynamicTableHandles>
) => {
  const additionalQueryValues: any[] = [];
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize,
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useImperativeHandle(ref, () => ({
    refreshTable: () => {
      refetch();
    },
    getSelectionIds: () => rowSelectionModel,
  }));

  useEffect(() => {
    setPaginationModel({
      page: 0,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const searchParams = new URLSearchParams();
  searchParams.append("search", searchValue);
  searchParams.append("page", (paginationModel.page + 1).toString());
  searchParams.append("length", paginationModel.pageSize.toString());

  // appending additional query to search params
  Object.keys(additionalQuery).map((key) => {
    searchParams.append(key, additionalQuery[key]);
    additionalQueryValues.push(additionalQuery[key]);
  });

  const url = "/table/" + endpoint + "?" + searchParams.toString();

  const { data, isLoading, isRefetching, refetch } =
    useQuery<TableDataStructure>({
      queryKey: [
        "table",
        endpoint,
        paginationModel.page,
        paginationModel.pageSize,
        searchValue,
        ...additionalQueryValues,
      ],
      queryFn: () => dataFetcher(url),
      keepPreviousData: true,
    });

  const loading = isLoading || isRefetching;

  return (
    <Paper
      sx={{
        height: 400,
      }}
    >
      <DataGrid
        localeText={localizationTable}
        disableRowSelectionOnClick
        rows={data?.data || []}
        slots={{
          loadingOverlay: TableLoadingOverlay,
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            ...buttons,
            deleteSelectionId: rowSelectionModel,
            refetchFunction: refetch,
            selectionFunction: setRowSelectionModel,
            searchFunction: enableSearch
              ? (value) => {
                  setSearchValue(value);
                }
              : undefined,
          },
        }}
        loading={loading}
        keepNonExistentRowsSelected
        columns={columns}
        pageSizeOptions={
          pageSizeOptions.includes(pageSize)
            ? pageSizeOptions
            : [pageSize, ...pageSizeOptions]
        }
        rowCount={data?.metadata?.count ?? 1}
        checkboxSelection
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        pagination
        rowHeight={40}
        paginationMode="server"
      />
    </Paper>
  );
};

const DynamicTable = forwardRef(DynamicTableContent);

export default DynamicTable;
