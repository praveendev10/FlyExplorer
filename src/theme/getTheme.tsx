import { createTheme } from "@mui/material";

export const getTheme = (mode: "dark" | "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
      ...(mode === "dark" && {
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      }),
    },
  });
