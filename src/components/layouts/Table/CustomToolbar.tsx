import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
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
import LoadingSpinner from "@/components/surfaces/loading/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { error } from "console";

export interface CustomToolbarProps {
  addButtonLink?: string;
  deleteButton?: TableList;
  deleteSelectionId: GridRowSelectionModel;
  refetchFunction: Function;
  selectionFunction: Function;
}

const CustomToolbar = ({
  addButtonLink,
  deleteButton,
  deleteSelectionId,
  refetchFunction,
  selectionFunction,
}: CustomToolbarProps) => {
  const { enqueueSnackbar } = useSnackbar();
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
            <Typography component="div">
              Ada <Chip label={`${deleteSelectionId.length} data`} /> yang
              dipilih
            </Typography>
          </div>
        ),
        showCancelButton: true,
        confirmButtonColor: "error",
        confirmButton: "Hapus",
        confirmCallback: () => {
          dispatch(setClose());
          dispatch(
            setOpen({
              content: <LoadingSpinner />,
              disableOutsideClick: true,
            })
          );
          axios
            .post(`/table/${deleteButton}/`, {
              data: deleteSelectionId,
            })
            .then((result) => {
              enqueueSnackbar("Data berhasil dihapus", {
                variant: "success",
              });
              refetchFunction();
              selectionFunction([]);
            })
            .catch((error) => {
              if (error instanceof AxiosError) {
                enqueueSnackbar("Data gagal dihapus, alasan: " + error.cause, {
                  variant: "error",
                });
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
            variant="contained"
            color="success"
            LinkComponent={Link}
            href={addButtonLink}
            startIcon={<AddIcon />}
          >
            Tambah
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
            variant="contained"
            color="error"
            onClick={handleDeleteSelection}
            startIcon={<DeleteIcon />}
          >
            Hapus
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
        <Button onClick={() => refetchFunction()} startIcon={<RefreshIcon />}>
          Segarkan
        </Button>
      </Tooltip>
      <Tooltip
        title={
          <TooltipTitle
            title="Opsi kolom"
            content="Click untuk menampilkan opsi kolom."
          />
        }
      >
        <GridToolbarColumnsButton size="medium" />
      </Tooltip>
      <Tooltip
        title={
          <TooltipTitle
            title="Kerapatan"
            content="Click untuk menampilkan opsi kerapatan baris dengan konten."
          />
        }
      >
        <GridToolbarDensitySelector size="medium" />
      </Tooltip>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
