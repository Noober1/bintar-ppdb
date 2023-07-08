import React from "react";
import { LocalizationProvider as Provider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/id";

const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider dateAdapter={AdapterDayjs} adapterLocale="id">
      {children}
    </Provider>
  );
};

export default LocalizationProvider;
