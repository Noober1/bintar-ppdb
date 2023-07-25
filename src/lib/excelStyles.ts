import { Style } from "excel4node";

export const centerCenter: Style["alignment"] = {
  horizontal: "center",
  vertical: "center",
};
export const leftCenter: Style["alignment"] = {
  horizontal: "left",
  vertical: "center",
};
export const allThinBorder: Style["border"] = {
  bottom: {
    color: "black",
    style: "thin",
  },
  left: {
    color: "black",
    style: "thin",
  },
  right: {
    color: "black",
    style: "thin",
  },
  top: {
    color: "black",
    style: "thin",
  },
};

export const allThickBorder: Style["border"] = {
  bottom: {
    color: "black",
    style: "medium",
  },
  left: {
    color: "black",
    style: "medium",
  },
  right: {
    color: "black",
    style: "medium",
  },
  top: {
    color: "black",
    style: "medium",
  },
};
