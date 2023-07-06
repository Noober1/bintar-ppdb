import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
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
  components: {
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
  },
});

export default theme;
