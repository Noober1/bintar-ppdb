import React, { FC, Ref, forwardRef } from "react";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { TableList } from "@/types/table";
import { useDispatch } from "react-redux";
import { setClose, setOpen } from "@/lib/redux/multiDialog";
import Typography from "@mui/material/Typography";
import axios, { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { IconButtonProps } from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import Button, { ButtonProps } from "@mui/material/Button";
import useMediaQuery from "@/hooks/useMediaQuery";

interface EditButtonProps {
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
}

export const EditButton = ({ color = "primary", href }: EditButtonProps) => {
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
  refreshTable?: () => void;
  confirmationTitle: string;
  confirmationNote?: React.ReactElement;
}

export const DeleteButton = ({
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
              type: "loading",
            })
          );
          axios
            .post(`/table/${table}/`, {
              data: id,
            })
            .then(() => {
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

interface DownloadButtonProps extends IconButtonProps {
  title: string;
  content: string;
  href: string;
}

export const DownloadButton: FC<DownloadButtonProps> = ({
  title,
  content,
  href,
}) => {
  return (
    <Tooltip title={<TooltipTitle title={title} content={content} />}>
      <IconButton href={href} color="success">
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

interface ToolbarButtonProps extends Omit<ButtonProps, "size"> {
  component?: keyof JSX.IntrinsicElements;
}

const ToolbarButtonElement = (
  { variant = "outlined", startIcon, children, ...rest }: ToolbarButtonProps,
  forwardedRef: Ref<HTMLButtonElement>
) => {
  const screenDownSm = useMediaQuery((query) => query.down("sm"));
  const screenDownMd = useMediaQuery((query) => query.down("md"));

  return (
    <Button
      ref={forwardedRef}
      variant={variant}
      size={screenDownMd ? "small" : "medium"}
      startIcon={!screenDownSm && startIcon}
      {...rest}
    >
      {screenDownSm ? startIcon : children}
    </Button>
  );
};

export const ToolbarButton = forwardRef(ToolbarButtonElement);
