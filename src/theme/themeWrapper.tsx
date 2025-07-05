"use client";
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Provider } from "react-redux";
import { getTheme } from "./getTheme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import store from "../redux/store"
const ThemeToggleContext = createContext({ toggleTheme: () => {} });

export const useThemeToggle = () => useContext(ThemeToggleContext);
export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">("light");
  useEffect(() => {
    // Only run on client
    const savedMode = localStorage.getItem("theme") as "light" | "dark";
    setMode(savedMode || "light");
  }, []);
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Provider store={store}>
      <ThemeToggleContext.Provider value={{ toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </Provider>
  );
};
