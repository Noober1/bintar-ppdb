"use client";

import { ButtonProps } from "@mui/material/Button";
import React, { FC } from "react";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import { Tooltip, TooltipTitle } from "../display/Tooltip";
import { ToolbarButton } from "./TableActionButton";

interface DownloadButtonProps extends ButtonProps {
  href: string;
  title: string;
  content: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  href,
  variant = "outlined",
  title,
  content,
  children,
}) => {
  return (
    <Tooltip title={<TooltipTitle title={title} content={content} />}>
      <ToolbarButton
        startIcon={<DownloadIcon />}
        component="a"
        href={href}
        variant={variant}
      >
        {children}
      </ToolbarButton>
    </Tooltip>
  );
};

export default DownloadButton;
