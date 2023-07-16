"use client";

import LoadingSpinner from "@/components/surfaces/loading/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { dataFetcher } from "@/lib/utils";
import React from "react";
import ErrorBox from "@/components/layouts/ErrorBox";
import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const Box = styled(MuiBox)(({ theme }) => ({
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
      textAlign: "left",
    },
  }));

  const { isLoading, data, isRefetching } = useQuery({
    queryKey: ["current-config"],
    queryFn: () => dataFetcher("/api/current-config"),
    keepPreviousData: true,
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <Box marginTop={3}>
        <LoadingSpinner label="Memuat konfigurasi..." />
      </Box>
    );
  }

  if (!data) {
    <Box>
      <ErrorBox message="Konfigurasi yang aktif tidak ditemukan. Silahkan hubungi administrator untuk mengaktifkan konfigurasi." />
    </Box>;
  }

  return children;
};

export default Layout;
