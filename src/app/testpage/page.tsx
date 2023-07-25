import React from "react";
import Snackbar from "./Snackbar";
import Draggable from "./Draggable";
import ThemeSwitch from "./ThemeSwitch";
import Forms from "./Forms";
import RowRadioGroup from "@/components/forms/RowRadioGroup";
import Link from "next/link";
import LoadingSpinner from "@/components/surfaces/loading/LoadingSpinner";

const Page = () => {
  return (
    <>
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
        <div>
          <LoadingSpinner />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <Forms />
        </div>
        <div>
          <RowRadioGroup
            label="Entah"
            name="test"
            options={[
              { label: "Pria", name: "MALE" },
              { label: "Wanita", name: "FEMALE" },
            ]}
            helperText="Jenis kelamin lah"
          />
        </div>
      </div>
      <div>
        <Link href="/testpage/loading">Loading</Link>
        <Link href="/testpage/errorbox">Error Box</Link>
      </div>
    </>
  );
};

export default Page;
