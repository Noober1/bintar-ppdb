"use client";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

const LoadingLogo = ({ progress: progressValue }: { progress?: number }) => {
  const [progress, setProgress] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      const random = Math.floor(Math.random() * 20) + 5;
      setProgress((prevProgress) => {
        const addProgress = prevProgress + random;
        const newProgress = addProgress > 100 ? 100 : addProgress;
        return prevProgress >= 100 ? 0 : newProgress;
      });
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progressValue) {
      setProgress(progressValue);
    }
  }, [progressValue]);

  return (
    <Box className="relative">
      <Fab
        size="large"
        className="shadow-none"
        color="primary"
        sx={{
          ":active": {
            boxShadow: "none",
          },
        }}
      >
        <div className="-ml-0.5 -mt-0.5 w-10">
          <Logo />
        </div>
      </Fab>
      <CircularProgress
        size={75}
        className="absolute -top-2.5 -left-2.5"
        variant="determinate"
        value={progress}
      />
    </Box>
  );
};

export default LoadingLogo;
