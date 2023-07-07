"use client";
import { configurationSelector, setTheme } from "@/lib/redux/config";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(configurationSelector);
  const handleSwitchTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };
  return (
    <>
      <Typography>Theme switcher test</Typography>
      <Button onClick={handleSwitchTheme}>Switch Theme</Button>
    </>
  );
};

export default ThemeSwitch;
