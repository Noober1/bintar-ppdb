import { Breakpoints, useTheme } from "@mui/material";
import mediaQuery from "@mui/material/useMediaQuery";

const useMediaQuery = (query: (query: Breakpoints) => string) => {
  const theme = useTheme();
  return mediaQuery(query(theme.breakpoints));
};

export default useMediaQuery;
