"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setClose, setOpen } from "@/lib/redux/multiDialog";
import Typography from "@mui/material/Typography";
import LoadingLogo from "@/components/feedbacks/LoadingLogo";
import LoadingSpinner from "@/components/surfaces/loading/LoadingSpinner";

const useLogoutDialog = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(
      setOpen({
        title: "Logout dari sistem",
        content: <Typography>Apakah anda yakin ingin logout?</Typography>,
        confirmButton: "Logout",
        rejectButton: "Batal",
        confirmCallback: () => {
          dispatch(setClose());
          dispatch(
            setOpen({
              disableOutsideClick: true,
              content: <LoadingSpinner />,
            })
          );
          signOut({
            redirect: true,
          }).catch((error) => {
            dispatch(setClose());
            dispatch(
              setOpen({
                title: "Gagal logout",
                content: "Gagal logout, silahkan coba kembali",
                showCancelButton: true,
              })
            );
          });
        },
      })
    );
  };

  return handleClickLogout;
};

export default useLogoutDialog;
