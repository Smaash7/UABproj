import React, { createContext, useContext, useState } from "react";

const lightTheme = {
  name: "light",
  background: "#ffeef8",
  text: "#3b0a36",
  primary: "#e91e63",
  secondary: "#fff1f7",
  card: "white",
  input: "#fff",
};

const darkTheme = {
  name: "dark",
  background: "#2a0b1d",
  text: "#ffeef8",
  primary: "#ff4081",
  secondary: "#3b0a36",
  card: "#3b0a36",
  input: "#4a2040",
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    name: themeName,
    ...themes[themeName],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
