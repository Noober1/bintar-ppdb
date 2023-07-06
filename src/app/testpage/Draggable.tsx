"use client";
import { setOpen } from "@/lib/redux/multiDialog";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch } from "react-redux";

const Draggable = () => {
  const dispatch = useDispatch();
  const handleOpenDraggableDialog = () => {
    dispatch(
      setOpen({
        title: "Draggable dialog",
        content: "Click title and drag it!",
        showCancelButton: true,
        confirmButton: "Open second layer Dialog",
        confirmCallback: () => {
          dispatch(
            setOpen({
              disableDrag: true,
              title: "Second dialog",
              content: "This dialog cannot be dragged",
              showCancelButton: true,
            })
          );
        },
      })
    );
  };
  return (
    <>
      <Typography>Draggable test</Typography>
      <Button onClick={handleOpenDraggableDialog}>Open dialog draggable</Button>
    </>
  );
};

export default Draggable;
