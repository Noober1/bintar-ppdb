"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const LoadingSkeleton = () => {
  const downSm = useMediaQuery((query) => query.down("sm"));
  return (
    <>
      {/* {[...new Array(3)].map((value, index) => (
        <div key={index}>
          <Stack direction="row" spacing={2} marginBottom={2}>
            {[...new Array(4)].map((v, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height="auto"
                className="w-1/4"
                sx={{
                  aspectRatio: "16 / 9",
                }}
              />
            ))}
          </Stack>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="75%" />
          <Skeleton animation="wave" width="75%" />
          <Skeleton animation="wave" width="50%" />
          <div className="w-full mb-5"></div>
        </div>
      ))} */}
      <Stack gap={2}>
        <Typography
          variant={downSm ? "h4" : "h3"}
          textAlign={downSm ? "center" : "left"}
        >
          <Skeleton animation="wave" className="w-full md:w-3/4 lg:w-1/2" />
        </Typography>
        <Skeleton variant="rectangular" animation="wave" height={300} />
        <Stack direction="row" gap={2}>
          <Skeleton variant="rounded" animation="wave" width="100%" />
          <Skeleton variant="rounded" animation="wave" width="100%" />
          <Skeleton variant="rounded" animation="wave" width="100%" />
          <Skeleton variant="rounded" animation="wave" width="100%" />
        </Stack>
      </Stack>
    </>
  );
};

export default LoadingSkeleton;
