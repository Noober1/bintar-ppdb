import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import React from "react";
import Link from "next/link";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import { TableList } from "@/types/table";
import { useDispatch } from "react-redux";
import { setClose, setOpen } from "@/lib/redux/multiDialog";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Box, IconButton } from "@mui/material";
import { ToolbarButton } from "@/components/buttons/TableActionButton";
import { SearchBar } from "./SearchBar";

export interface CustomToolbarProps {
  addButtonLink?: string;
  deleteButton?: TableList;
  deleteSelectionId: GridRowSelectionModel;
  refetchFunction: () => void;
  selectionFunction: (value: (string | number)[]) => void;
  deleteConfirmationNote?: React.ReactElement;
  customButton?: React.ReactNode;
  searchFunction?: (value: string) => void;
}

const CustomToolbar = ({
  addButtonLink,
  deleteButton,
  deleteSelectionId,
  refetchFunction,
  selectionFunction,
  deleteConfirmationNote,
  customButton,
  searchFunction,
}: CustomToolbarProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const screenDownMd = useMediaQuery((query) => query.down("md"));
  const screenDownSm = useMediaQuery((query) => query.down("sm"));
  const dispatch = useDispatch();
  const handleDeleteSelection = () => {
    if (!deleteSelectionId.length) {
      dispatch(
        setOpen({
          title: "Error",
          content: "Silahkan pilih data terlebih dahulu untuk menghapus",
          showCancelButton: true,
        })
      );
      return false;
    }
    dispatch(
      setOpen({
        title: "Hapus data",
        content: (
          <div>
            <Typography gutterBottom>
              Apakah anda yakin ingin menghapus data yang dipilih?
            </Typography>
            <Typography component="div" gutterBottom>
              Ada <Chip label={`${deleteSelectionId.length} data`} /> yang
              dipilih
            </Typography>
            {deleteConfirmationNote}
          </div>
        ),
        showCancelButton: true,
        confirmButtonColor: "error",
        confirmButton: "Hapus",
        confirmCallback: () => {
          dispatch(setClose());
          dispatch(
            setOpen({
              type: "loading",
            })
          );
          axios
            .post(`/table/${deleteButton}/`, {
              data: deleteSelectionId,
            })
            .then(() => {
              enqueueSnackbar("Data berhasil dihapus", {
                variant: "success",
              });
              refetchFunction();
              selectionFunction([]);
            })
            .catch((error) => {
              if (error instanceof AxiosError) {
                enqueueSnackbar(
                  "Data gagal dihapus, alasan: " + error.response?.data.message,
                  {
                    variant: "error",
                  }
                );
              }
            })
            .finally(() => {
              dispatch(setClose());
            });
        },
      })
    );
  };

  return (
    <GridToolbarContainer className="mx-2 mt-1">
      {customButton}
      {addButtonLink && (
        <Tooltip
          title={
            <TooltipTitle
              title="Tambah data"
              content="Click untuk menambah data."
            />
          }
        >
          <Button
            variant="outlined"
            size={screenDownMd ? "small" : "medium"}
            color="success"
            LinkComponent={Link}
            href={addButtonLink}
            startIcon={!screenDownSm && <AddIcon />}
          >
            {screenDownSm ? <AddIcon /> : "Tambah"}
          </Button>
        </Tooltip>
      )}
      {deleteButton && (
        <Tooltip
          title={
            <TooltipTitle
              title="Hapus"
              content="Click untuk menghapus data yang dipilih"
            />
          }
        >
          <Button
            variant="outlined"
            size={screenDownMd ? "small" : "medium"}
            color="error"
            onClick={handleDeleteSelection}
            startIcon={!screenDownSm && <DeleteIcon />}
          >
            {screenDownSm ? <DeleteIcon /> : "Hapus"}
          </Button>
        </Tooltip>
      )}
      <Tooltip
        title={
          <TooltipTitle
            title="Segarkan"
            content="Click segarkan/refresh tabel"
          />
        }
      >
        <Button
          onClick={() => refetchFunction()}
          variant={screenDownSm ? "outlined" : "text"}
          startIcon={!screenDownSm && <RefreshIcon />}
          size={screenDownMd ? "small" : "medium"}
        >
          {screenDownSm ? <RefreshIcon /> : "Segarkan"}
        </Button>
      </Tooltip>
      {!screenDownSm && (
        <>
          <Tooltip
            title={
              <TooltipTitle
                title="Opsi kolom"
                content="Click untuk menampilkan opsi kolom."
              />
            }
          >
            <GridToolbarColumnsButton
              size={screenDownMd ? "small" : "medium"}
            />
          </Tooltip>
          <Tooltip
            title={
              <TooltipTitle
                title="Kerapatan"
                content="Click untuk menampilkan opsi kerapatan baris dengan konten."
              />
            }
          >
            <GridToolbarDensitySelector
              size={screenDownMd ? "small" : "medium"}
            />
          </Tooltip>
          {typeof searchFunction === "function" && (
            <Tooltip
              title={
                <TooltipTitle
                  title="Cari"
                  content="Click untuk menampilkan opsi pencarian."
                />
              }
            >
              <Box className="flex justify-end items-center flex-1">
                <SearchBar submitSearch={searchFunction} />
              </Box>
            </Tooltip>
          )}
        </>
      )}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
