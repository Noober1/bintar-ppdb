"use client";
import React from "react";
import { MobileDatePicker as Picker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import useMediaQuery from "@/hooks/useMediaQuery";

interface DatePickerProps {
  label?: string;
  value: Date;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: Date) => void;
  helperText?: string;
}

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable handle=".drag-anchor">
      <Paper {...props} />
    </Draggable>
  );
};

const DatePicker = ({
  value,
  onChange,
  label,
  helperText,
}: DatePickerProps) => {
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
        textField: {
          helperText: helperText,
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
      onAccept={handleChange}
    />
  );
};

export default DatePicker;
