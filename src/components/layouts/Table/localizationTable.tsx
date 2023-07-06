import { GridLocaleText } from "@mui/x-data-grid";
import React from "react";

type LocalizationTable = Partial<GridLocaleText>;

const localizationTable: LocalizationTable = {
  // Root
  noRowsLabel: "Tidak ada baris",
  noResultsOverlayLabel: "Tidak ada data ditemukan.",

  // Density selector toolbar button text
  toolbarDensity: "Kerapatan",
  toolbarDensityLabel: "Kerapatan",
  toolbarDensityCompact: "Sempit",
  toolbarDensityStandard: "Standar",
  toolbarDensityComfortable: "Luas",

  // Columns selector toolbar button text
  toolbarColumns: "Kolom",
  toolbarColumnsLabel: "Pilih kolom",

  // Filters toolbar button text
  toolbarFilters: "Filter",
  toolbarFiltersLabel: "Tampilkan filter",
  toolbarFiltersTooltipHide: "Sembunyikan filter",
  toolbarFiltersTooltipShow: "Tampilkan filter",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filter aktif` : `${count} filter aktif`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "Mencari...",
  toolbarQuickFilterLabel: "Cari",
  toolbarQuickFilterDeleteIconLabel: "Hapus?",

  // Export selector toolbar button text
  toolbarExport: "Ekspor",
  toolbarExportLabel: "Ekspor",
  toolbarExportCSV: "Unduh sebagai CSV",
  toolbarExportPrint: "Cetak",
  toolbarExportExcel: "Unduh sebagai Excel",

  // Columns panel text
  columnsPanelTextFieldLabel: "Temukan kolom",
  columnsPanelTextFieldPlaceholder: "Judul kolom",
  columnsPanelDragIconLabel: "Reorder column",
  columnsPanelShowAllButton: "Tampilkan semua",
  columnsPanelHideAllButton: "Sembunyikan semua",

  // Filter panel text
  filterPanelAddFilter: "Tambah filter",
  filterPanelRemoveAll: "Hapus semua",
  filterPanelDeleteIconLabel: "hapus",
  filterPanelLogicOperator: "Logic operator",
  filterPanelOperator: "Operator",
  filterPanelOperatorAnd: "And",
  filterPanelOperatorOr: "Or",
  filterPanelColumns: "Kolom",
  filterPanelInputLabel: "Nilai",
  filterPanelInputPlaceholder: "Filter nilai",

  // Filter operators text
  filterOperatorContains: "mengandung",
  filterOperatorEquals: "sama dengan",
  filterOperatorStartsWith: "dimulai dengan",
  filterOperatorEndsWith: "diakhiri dengan",
  filterOperatorIs: "is",
  filterOperatorNot: "is not",
  filterOperatorAfter: "is after",
  filterOperatorOnOrAfter: "is on or after",
  filterOperatorBefore: "is before",
  filterOperatorOnOrBefore: "is on or before",
  filterOperatorIsEmpty: "kosong",
  filterOperatorIsNotEmpty: "tidak kosong",
  filterOperatorIsAnyOf: "apapun seperti",
  "filterOperator=": "=",
  "filterOperator!=": "!=",
  "filterOperator>": ">",
  "filterOperator>=": ">=",
  "filterOperator<": "<",
  "filterOperator<=": "<=",

  // Header filter operators text
  headerFilterOperatorContains: "Mengandung",
  headerFilterOperatorEquals: "Sama dengan",
  headerFilterOperatorStartsWith: "Dimulai dengan",
  headerFilterOperatorEndsWith: "Berakhir dengan",
  headerFilterOperatorIs: "Is",
  headerFilterOperatorNot: "Is not",
  headerFilterOperatorAfter: "Is after",
  headerFilterOperatorOnOrAfter: "Is on or after",
  headerFilterOperatorBefore: "Is before",
  headerFilterOperatorOnOrBefore: "Is on or before",
  headerFilterOperatorIsEmpty: "Is empty",
  headerFilterOperatorIsNotEmpty: "Is not empty",
  headerFilterOperatorIsAnyOf: "Is any of",
  "headerFilterOperator=": "Sama dengan",
  "headerFilterOperator!=": "Tidak sama dengan",
  "headerFilterOperator>": "Lebih besar dari",
  "headerFilterOperator>=": "Lebih besar sama dengan dari",
  "headerFilterOperator<": "Kurang dari",
  "headerFilterOperator<=": "Kurang dari sama dengan dari",

  // Filter values text
  filterValueAny: "apapun",
  filterValueTrue: "true",
  filterValueFalse: "false",

  // Column menu text
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Tunjukan kolom",
  columnMenuManageColumns: "Kelola kolom",
  columnMenuFilter: "Filter",
  columnMenuHideColumn: "Sembunyikan kolom",
  columnMenuUnsort: "Hapus sortiran",
  columnMenuSortAsc: "Urutkan menaik",
  columnMenuSortDesc: "Urutkan menurun",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filter aktif` : `${count} filter aktif`,
  columnHeaderFiltersLabel: "Tampilkan filter",
  columnHeaderSortIconLabel: "Urutkan",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} baris dipilih`
      : `${count.toLocaleString()} baris dipilih`,

  // Total row amount footer text
  footerTotalRows: "Total baris:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} dari ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Checkbox selection",
  checkboxSelectionSelectAllRows: "Pilih semua baris",
  checkboxSelectionUnselectAllRows: "Hapus pilih pada semua baris",
  checkboxSelectionSelectRow: "Pilih baris",
  checkboxSelectionUnselectRow: "Hapus pilih baris",

  // Boolean cell text
  booleanCellTrueLabel: "ya",
  booleanCellFalseLabel: "tidak",

  // Actions cell more text
  actionsCellMore: "lebih banyak",

  // Column pinning text
  pinToLeft: "Pin ke kiri",
  pinToRight: "Pin ke kanan",
  unpin: "Unpin",

  // Tree Data
  treeDataGroupingHeaderName: "Grup",
  treeDataExpand: "see children",
  treeDataCollapse: "hide children",

  // Grouping columns
  groupingColumnHeaderName: "Group",
  groupColumn: (name) => `Group by ${name}`,
  unGroupColumn: (name) => `Stop grouping by ${name}`,

  // Master/detail
  detailPanelToggle: "Detail panel toggle",
  expandDetailPanel: "Expand",
  collapseDetailPanel: "Collapse",

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: "Row reordering",

  // Aggregation
  aggregationMenuItemHeader: "Aggregation",
  aggregationFunctionLabelSum: "sum",
  aggregationFunctionLabelAvg: "avg",
  aggregationFunctionLabelMin: "min",
  aggregationFunctionLabelMax: "max",
  aggregationFunctionLabelSize: "size",
};

export default localizationTable;
