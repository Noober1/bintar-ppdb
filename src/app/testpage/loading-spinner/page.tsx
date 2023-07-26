"use client";
import LoadingSpinner from "@/components/surfaces/loading/LoadingSpinner";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default Page;
