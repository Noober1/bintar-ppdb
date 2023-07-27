"use client";

import { setOpen } from "@/lib/redux/multiDialog";
import Button from "@mui/material/Button";
import React from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();

  const handleOpenFirstDialog = () => {
    dispatch(
      setOpen({
        name: "first-dialog",
        confirmButton: "Open second dialog",
        content: "you can click outside to close dialog",
        showCancelButton: true,
        confirmCallback: handleOpenSecondDialog,
      })
    );
  };

  const handleOpenSecondDialog = () => {
    dispatch(
      setOpen({
        name: "second-dialog",
        confirmButton: "Open third dialog",
        content: "This dialog can't click outside",
        disableOutsideClick: true,
        showCancelButton: true,
        confirmCallback: handleOpenThirdDialog,
      })
    );
  };

  const handleOpenThirdDialog = () => {
    dispatch(
      setOpen({
        type: "loading",
        loadingLabel: "Manakutau",
      })
    );
  };

  return <Button onClick={handleOpenFirstDialog}>Open dialog</Button>;
};

export default Page;
