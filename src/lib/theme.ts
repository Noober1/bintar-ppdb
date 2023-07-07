import { Components, Theme, createTheme } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const components: Components<Omit<Theme, "components">> = {
  MuiTooltip: {
    defaultProps: {
      followCursor: true,
    },
  },
  MuiAlert: {
    defaultProps: {
      variant: "filled",
    },
    styleOverrides: {
      root: {
        fontWeight: "bold",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        ":hover": {
          boxShadow: "none",
        },
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ECF0F1",
    },
    primary: {
      main: "#28166F",
    },
    secondary: {
      main: "#FFF500",
    },
  },
  typography: {
    allVariants: inter.style,
  },
  components,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F1F1F",
    },
    primary: {
      main: "#6444e3",
    },
    secondary: {
      main: "#FFF500",
    },
  },
  typography: {
    allVariants: inter.style,
  },
  components,
});

export { lightTheme, darkTheme };
