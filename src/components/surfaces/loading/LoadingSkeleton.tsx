"use client";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div>
      {[...new Array(3)].map((value, index) => (
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
      ))}
    </div>
  );
};

export default LoadingSkeleton;
