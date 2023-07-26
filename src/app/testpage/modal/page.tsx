"use client";

import { setLoading, setOpen } from "@/lib/redux/multiDialog";
import Button from "@mui/material/Button";
import React from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const promiseTest = () =>
    new Promise((resolve) => {
      dispatch(
        setLoading({
          name: "testModal",
          loading: true,
        })
      );
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  const handleLoading = async () => {
    promiseTest().then(() => {
      dispatch(
        setLoading({
          name: "testModal",
          loading: false,
        })
      );
    });
  };
  const openModal = () => {
    dispatch(
      setOpen({
        title: "test",
        name: "testModal",
        content: <Button onClick={handleLoading}>Test</Button>,
      })
    );
  };

  return <Button onClick={openModal}>Open Modal</Button>;
};

export default Page;
