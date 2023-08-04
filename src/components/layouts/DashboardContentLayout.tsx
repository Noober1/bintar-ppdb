"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import IconButton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import LeftArrow from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipTitle } from "@/components/display/Tooltip";

interface DashboardContentLayoutProps {
  children: React.ReactNode;
  title: string;
  backButtonUrl?: string;
}

const DashboardContentLayout = ({
  children,
  title,
  backButtonUrl,
}: DashboardContentLayoutProps) => {
  const downSm = useMediaQuery((query) => query.down("sm"));
  const router = useRouter();
  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={downSm ? "center" : "left"}
        alignItems="center"
        marginBottom="10px"
      >
        {backButtonUrl && (
          <Tooltip
            title={
              <TooltipTitle
                title="Kembali"
                content="Kembali ke halaman sebelumnya"
              />
            }
          >
            <IconButton onClick={() => router.push(backButtonUrl)}>
              <LeftArrow />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant={downSm ? "h5" : "h4"}
          textAlign={downSm ? "center" : "left"}
          fontWeight="bold"
          flexGrow={downSm ? 1 : 0}
        >
          {title}
        </Typography>
      </Stack>
      <Box>{children}</Box>
    </Stack>
  );
};

export default DashboardContentLayout;
