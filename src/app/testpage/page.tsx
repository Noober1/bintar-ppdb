import React from "react";
import Snackbar from "./Snackbar";
import Draggable from "./Draggable";
import ThemeSwitch from "./ThemeSwitch";
import Forms from "./Forms";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <Snackbar />
      </div>
      <div>
        <Draggable />
      </div>
      <div>
        <ThemeSwitch />
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <Forms />
      </div>
    </div>
  );
};

export default Page;
