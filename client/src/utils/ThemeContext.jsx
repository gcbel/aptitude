/* DEPENDENCIES */
import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "./themes";

/* THEME CONTEXT */
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get saved theme or set default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme !== null ? parseInt(savedTheme) : 6;
  });

  // Save theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
