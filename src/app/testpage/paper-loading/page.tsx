"use client";

import PaperWithLoading from "@/components/surfaces/PaperWithLoading";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import React, { useState } from "react";

const Page = () => {
  const [loading, setloading] = useState<boolean>(false);
  const handleChange = () => setloading(!loading);

  return (
    <Box>
      <Switch onChange={handleChange} checked={loading} />
      <PaperWithLoading loading={loading}>Test</PaperWithLoading>
    </Box>
  );
};

export default Page;
