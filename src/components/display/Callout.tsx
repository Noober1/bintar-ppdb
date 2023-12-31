"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";

type Colors =
  | "primary"
  | "secondary"
  | "warning"
  | "error"
  | "info"
  | "success";

type ColorsObject = {
  // eslint-disable-next-line no-unused-vars
  [key in Colors]: {
    background: string;
    color: string;
  };
};

interface CalloutProps {
  title: string;
  content: string;
  loading?: boolean;
  icon?: React.ReactElement;
  color?: Colors;
}

const Callout: FC<CalloutProps> = ({
  title,
  content,
  icon,
  loading,
  color = "primary",
}) => {
  const { palette } = useTheme();
  const colors: ColorsObject = {
    primary: {
      background: palette.primary.main,
      color: palette.primary.contrastText,
    },
    error: {
      background: palette.error.main,
      color: palette.error.contrastText,
    },
    info: {
      background: palette.info.main,
      color: palette.info.contrastText,
    },
    secondary: {
      background: palette.secondary.main,
      color: palette.secondary.contrastText,
    },
    warning: {
      background: palette.warning.main,
      color: palette.warning.contrastText,
    },
    success: {
      background: palette.success.main,
      color: palette.success.contrastText,
    },
  };
  return (
    <Box
      component={Paper}
      border={1}
      borderColor={alpha("#000", 0.15)}
      padding={1}
    >
      <Stack direction="row" gap={1}>
        {loading ? (
          <Skeleton
            variant="rectangular"
            className="aspect-square rounded-md"
            height="75px"
          />
        ) : (
          <Box
            bgcolor={colors[color].background}
            color={colors[color].color}
            height="75px"
            className="aspect-square flex items-center justify-center rounded-md"
          >
            <SvgIcon fontSize="large">{icon ?? <QuestionMarkIcon />}</SvgIcon>
          </Box>
        )}
        <Stack
          overflow="hidden"
          width="75%"
          justifyContent="center"
          paddingX={0.5}
        >
          <Typography
            variant="h6"
            whiteSpace="nowrap"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {loading ? <Skeleton /> : title}
          </Typography>
          <Typography
            variant="body1"
            whiteSpace="nowrap"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {loading ? (
              <Skeleton />
            ) : typeof content === "undefined" ? null : (
              content
            )}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Callout;
