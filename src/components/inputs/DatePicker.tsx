"use client";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { MobileDatePicker as Picker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import useMediaQuery from "@/hooks/useMediaQuery";

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (value: Date) => void;
}

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable handle=".drag-anchor">
      <Paper {...props} />
    </Draggable>
  );
};

const DatePicker = ({ value, onChange, label }: DatePickerProps) => {
  const downMd = useMediaQuery((query) => query.down("sm"));
  const handleChange = (newValue: Dayjs | null) => {
    onChange(newValue?.toDate() || new Date());
  };

  return (
    <Picker
      slots={{
        mobilePaper: PaperComponent,
      }}
      slotProps={{
        toolbar: {
          className: downMd ? "cursor-move" : "drag-anchor cursor-move",
          toolbarFormat: "DD MMMM YYYY",
        },
        dialog: {
          fullScreen: downMd,
        },
      }}
      format="DD MMMM YYYY"
      localeText={{
        toolbarTitle: label ?? "Pilih tanggal",
        okButtonLabel: "Pilih",
        cancelButtonLabel: "Batal",
      }}
      label={label}
      value={dayjs(value)}
      onChange={handleChange}
    />
  );
};

export default DatePicker;
