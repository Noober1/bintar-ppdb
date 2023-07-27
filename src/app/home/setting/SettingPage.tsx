"use client";

import { UserDataResponse } from "@/app/api/user/route";
import DashboardContentLayout from "@/components/layouts/DashboardContentLayout";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import MoreIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { setOpen } from "@/lib/redux/multiDialog";
import ChangePasswordBox from "./ChangePasswordBox";
import { dataFetcher } from "@/lib/utils";
import ChangeNameBox from "./ChangeNameBox";
import LoadingSkeleton from "@/components/surfaces/loading/LoadingSkeleton";

const SettingPage = () => {
  const dispatch = useDispatch();
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
        name: "change-password-dialog",
        showCloseButton: true,
        disableOutsideClick: true,
        title: "Ubah kata sandi",
        content: <ChangePasswordBox />,
      })
    );
  };

  const handleChangeName = () => {
    dispatch(
      setOpen({
        name: "change-name-dialog",
        showCloseButton: true,
        disableOutsideClick: true,
        title: "Ubah nama",
        content: <ChangeNameBox fullName={data?.fullname} />,
      })
    );
  };

  return (
    <DashboardContentLayout title="Pengaturan">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Box component={Paper}>
          <Box className="p-4">
            <Typography variant="h4">Profile</Typography>
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
              onClick={handleChangeName}
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
                <br />
              </Typography>
              <Box>
                <Typography fontWeight="bold">{data?.email}</Typography>
                <Typography variant="caption">
                  (*)Data tidak dapat dirubah
                </Typography>
              </Box>
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
