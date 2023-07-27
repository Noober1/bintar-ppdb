import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

const links = [
  { link: "snackbar", label: "Snackbar" },
  { link: "dialog", label: "Dialog" },
  { link: "errorbox", label: "Error Box" },
  { link: "loading", label: "Content Loading Skeleton" },
  { link: "loading-spinner", label: "Loading spinner" },
  { link: "paper-loading", label: "Paper with loading overlay" },
  { link: "forms", label: "Forms" },
];

const Page = () => {
  return (
    <>
      <div>
        <ul>
          {links.map((value) => (
            <li key={value.link}>
              <Link href={"/testpage/" + value.link}>{value.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <ThemeSwitch />
    </>
  );
};

export default Page;
