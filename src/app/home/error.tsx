"use client";
import React from "react";
import ErrorBox from "@/components/layouts/ErrorBox";

const ErrorPage = ({ error }: { error: Error }) => {
  return <ErrorBox message={error.message || "No"} />;
};

export default ErrorPage;
