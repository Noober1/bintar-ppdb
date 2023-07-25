"use client";

import { UserDataResponse } from "@/app/api/user/route";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";

import MoreIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { setOpen } from "@/lib/redux/multiDialog";
import ChangePasswordBox, {
  ChangePasswordBoxHandles,
} from "./ChangePasswordBox";
import { dataFetcher } from "@/lib/utils";

const SettingPage = () => {
  const dispatch = useDispatch();
  const passwordBoxRef = useRef<ChangePasswordBoxHandles>(null);
  const { isLoading, data } = useQuery<UserDataResponse>({
    queryKey: ["user-data"],
    queryFn: ({ signal }) =>
      dataFetcher({
        url: "/api/user",
        signal,
      }),
    keepPreviousData: true,
  });

  const handleChangePassword = () => {
    dispatch(
      setOpen({
        title: "Ubah kata sandi",
        confirmButton: "Simpan perubahan",
        rejectButton: "Batal",
        content: <ChangePasswordBox ref={passwordBoxRef} />,
        confirmCallback: () => {
          passwordBoxRef.current?.submit();
        },
      })
    );
  };

  return (
    <DashboardContentLayout title="Pengaturan">
      {isLoading ? (
        <Skeleton />
      ) : (
        <Box component={Paper}>
          <Box className="p-4">
            <Typography variant="h4">Akun</Typography>
            <Typography variant="body2">
              Berikut adalah informasi akun Anda.
            </Typography>
          </Box>
          <Box>
            <AccordionSummary
              sx={{ cursor: "default" }}
              expandIcon={<MoreIcon />}
              aria-controls="fullname"
              id="fullname-header"
            >
              <Typography className="w-1/3 flex-shrink-0">
                Nama lengkap
              </Typography>
              <Typography textTransform="capitalize">
                {data?.fullname}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionSummary
              sx={{ cursor: "default" }}
              expandIcon={<MoreIcon />}
              aria-controls="email"
              id="email-header"
            >
              <Typography className="w-1/3 flex-shrink-0">
                Surel(Email)
              </Typography>
              <Typography fontWeight="bold">{data?.email}</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionSummary
              expandIcon={<MoreIcon />}
              aria-controls="password"
              id="password-header"
              onClick={handleChangePassword}
            >
              <Typography className="w-1/3 flex-shrink-0">
                Kata sandi
              </Typography>
              <Typography>Click untuk mengubah kata sandi</Typography>
            </AccordionSummary>
          </Box>
        </Box>
      )}
    </DashboardContentLayout>
  );
};

export default SettingPage;
