"use client";
import { multiDialogSelector, setClose } from "@/lib/redux/multiDialog";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import Paper, { PaperProps } from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import LoadingLogo from "@/components/feedbacks/LoadingLogo";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import useMediaQuery from "@/hooks/useMediaQuery";
import LoadingSpinner from "../loading/LoadingSpinner";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PaperComponent = ({ variant, elevation, ...props }: PaperProps) => {
  return (
    <Draggable
      handle=".drag-anchor"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const MultiLayerDialog = () => {
  const dispatch = useDispatch();
  const data = useSelector(multiDialogSelector);
  const fullScreen = useMediaQuery((breakpoint) => breakpoint.down("sm"));

  const handleClose = () => {
    dispatch(setClose());
  };

  return (
    <>
      {data.map((value, index) => {
        return (
          <Dialog
            key={index}
            fullScreen={fullScreen && value.type === "loading"}
            open={value.isOpen || false}
            maxWidth="sm"
            fullWidth={value.type !== "loading"}
            PaperComponent={PaperComponent}
            PaperProps={{
              className: "relative",
            }}
            onClose={
              value.disableOutsideClick || value.type === "loading"
                ? undefined
                : handleClose
            }
            disableEscapeKeyDown={
              value.disableOutsideClick || value.type === "loading"
            }
            keepMounted={false}
          >
            {value.type !== "loading" ? (
              <>
                {value.title && (
                  <DialogTitle
                    className={clsx(
                      "relative",
                      value.disableDrag
                        ? "cursor-default"
                        : "cursor-move drag-anchor"
                    )}
                  >
                    {value.title}
                    {value.showCloseButton && (
                      <IconButton
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </DialogTitle>
                )}
                <DialogContent>{value.content}</DialogContent>
                {(value.confirmButton ||
                  value.rejectButton ||
                  value.showCancelButton) && (
                  <DialogActions>
                    {value.confirmButton && (
                      <Button
                        color={value.confirmButtonColor}
                        onClick={value.confirmCallback}
                      >
                        {value.confirmButton}
                      </Button>
                    )}
                    {value.rejectButton ? (
                      <Button
                        color={value.rejectButtonColor}
                        onClick={value.rejectCallback ?? handleClose}
                      >
                        {value.rejectButton}
                      </Button>
                    ) : (
                      value.showCancelButton && (
                        <Button onClick={handleClose}>Tutup</Button>
                      )
                    )}
                  </DialogActions>
                )}
                <Fade in={value.isLoading}>
                  <Box
                    className="absolute inset-0 flex items-center justify-center"
                    sx={{
                      backgroundColor: (theme) =>
                        alpha(theme.palette.background.paper, 0.6),
                    }}
                  >
                    <LoadingLogo />
                  </Box>
                </Fade>
              </>
            ) : (
              <Box padding={2}>
                <LoadingSpinner label={value.loadingLabel} />
              </Box>
            )}
          </Dialog>
        );
      })}
    </>
  );
};

export default MultiLayerDialog;
