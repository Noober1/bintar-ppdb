"use client";

import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import clsx from "clsx";
import React, { ReactNode, Ref, forwardRef } from "react";
import LoadingLogo from "../feedbacks/LoadingLogo";
import { alpha, styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";

export interface PaperWithLoadingProps extends PaperProps {
  className?: string;
  loading?: boolean;
}

const NewPaper = styled(Paper)(({ theme }) => ({
  minHeight: "100px",
}));

const PaperWithLoading = (
  { className, children, loading, ...props }: PaperWithLoadingProps,
  ref: Ref<any>
) => {
  return (
    <NewPaper
      variant="outlined"
      className={clsx("relative overflow-hidden", className)}
      ref={ref}
      {...props}
    >
      {children}
      <Fade in={loading}>
        <Box
          sx={{
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.6),
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <LoadingLogo />
        </Box>
      </Fade>
    </NewPaper>
  );
};

export default forwardRef(PaperWithLoading);
