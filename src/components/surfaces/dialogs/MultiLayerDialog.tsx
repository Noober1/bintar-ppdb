"use client";
import { multiDialogSelector, setClose } from "@/lib/redux/multiDialog";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

const PaperComponent = (props: PaperProps) => {
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
  const handleClose = () => {
    dispatch(setClose());
  };
  return (
    <>
      {data.map((value, index) => (
        <Dialog
          key={index}
          open
          PaperComponent={PaperComponent}
          onClose={value.disableOutsideClick ? undefined : handleClose}
          disableEscapeKeyDown={value.disableOutsideClick}
          keepMounted={false}
        >
          {value.title && (
            <DialogTitle
              className={
                value.disableDrag ? "cursor-default" : "cursor-move drag-anchor"
              }
            >
              {value.title}
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
        </Dialog>
      ))}
    </>
  );
};

export default MultiLayerDialog;
