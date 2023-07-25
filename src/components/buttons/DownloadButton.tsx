"use client";

import Button, { ButtonProps } from "@mui/material/Button";
import React, { FC } from "react";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import { Tooltip, TooltipTitle } from "../display/Tooltip";

interface DownloadButtonProps extends ButtonProps {
  href: string;
  title: string;
  content: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  href,
  variant = "outlined",
  size,
  title,
  content,
  children,
}) => {
  return (
    <Tooltip title={<TooltipTitle title={title} content={content} />}>
      <Button
        startIcon={<DownloadIcon />}
        component="a"
        href={href}
        variant={variant}
        size={size}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default DownloadButton;
