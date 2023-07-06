import React from "react";
import Snackbar from "./Snackbar";
import Draggable from "./Draggable";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <Snackbar />
      </div>
      <div>
        <Draggable />
      </div>
    </div>
  );
};

export default Page;
