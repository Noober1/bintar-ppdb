import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";
import React from "react";

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const TooltipTitle = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <>
      <Typography color="inherit">{title}</Typography>
      <Typography color="inherit" variant="caption">
        {content}
      </Typography>
    </>
  );
};

export { Tooltip, TooltipTitle };
