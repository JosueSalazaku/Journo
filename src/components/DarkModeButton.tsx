import React from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun } from "lucide-react";

function DarkModeButton() {
  const { theme, toggleTheme } = useTheme();

const strokeColor = theme === "dark" ? "#ffffff" : "#ffffff"; // White for dark mode, black for light mode

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-main-orange fixed bottom-10 dark:bg-primary bg-primary right-10 flex items-center justify-center rounded-full p-4"
    >
      {theme === "dark" ? <Sun stroke={strokeColor} /> : <Moon stroke={strokeColor} />}
    </button>
  );
}

export default DarkModeButton;
