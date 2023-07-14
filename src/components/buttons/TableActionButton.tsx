import React from "react";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { TableList } from "@/types/table";
import { useDispatch } from "react-redux";
import { setClose, setOpen } from "@/lib/redux/multiDialog";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "../surfaces/loading/LoadingSpinner";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";

type TEditButton = (props: {
  href: string;
  color?:
    | "info"
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning";
}) => React.ReactElement;

const EditButton: TEditButton = ({ color = "primary", href }) => {
  return (
    <Tooltip
      title={
        <TooltipTitle title="Sunting" content="Click untuk menyunting data" />
      }
    >
      <IconButton color={color} LinkComponent={Link} href={href}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

interface DeleteButtonProps {
  table: TableList;
  id: number | string;
  refreshTable?: Function;
  confirmationTitle: string;
  confirmationNote?: React.ReactElement;
}

const DeleteButton = ({
  id,
  table,
  refreshTable,
  confirmationTitle,
  confirmationNote,
}: DeleteButtonProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = () => {
    dispatch(
      setOpen({
        title: confirmationTitle,
        content: (
          <>
            <Typography gutterBottom>
              Apakah anda yakin ingin menghapus data?
            </Typography>
            {confirmationNote}
          </>
        ),
        showCancelButton: true,
        confirmButton: "Hapus",
        confirmButtonColor: "error",
        confirmCallback: () => {
          dispatch(setClose());
          dispatch(
            setOpen({
              content: <LoadingSpinner />,
              disableOutsideClick: true,
            })
          );
          axios
            .post(`/table/${table}/`, {
              data: id,
            })
            .then((result) => {
              enqueueSnackbar("Data berhasil dihapus", {
                variant: "success",
              });
              if (typeof refreshTable === "function") {
                refreshTable();
              }
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
    <Tooltip
      title={
        <TooltipTitle title="Hapus" content="Click untuk menghapus data." />
      }
    >
      <IconButton color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export { EditButton, DeleteButton };
