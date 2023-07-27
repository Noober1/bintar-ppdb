"use client";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { useTheme } from "@mui/material/styles";

const LoadingLogo = ({ progress: progressValue }: { progress?: number }) => {
  const [progress, setProgress] = useState<number>(10);
  const theme = useTheme();
  const mainBackground = theme.palette.primary.main;

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
    <Box className="relative w-14 h-14">
      <CircularProgress
        size="76px"
        className="absolute top-0 left-0"
        sx={{
          position: "absolute",
          top: "-10px",
          left: "-10px",
        }}
        variant="determinate"
        value={progress}
      />
      <Box
        className="absolute top-0 left-0 flex justify-center items-center w-14 h-14 rounded-full"
        sx={{ backgroundColor: mainBackground }}
      >
        <Box className="w-10 h-10 -mt-3">
          <Logo />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingLogo;
