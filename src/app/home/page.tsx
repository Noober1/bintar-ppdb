import React from "react";

const dummyFetch = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, 2000);
  });

const DashboardPage = async () => {
  await dummyFetch();
  return <div>test</div>;
};

export default DashboardPage;
