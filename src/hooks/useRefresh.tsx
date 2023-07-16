"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// used to refetch data when acessing with next navigation
const useRefresh = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("trigger refresh");
    router.refresh();
    return () => {};
  }, [router]);

  return null;
};

export default useRefresh;
