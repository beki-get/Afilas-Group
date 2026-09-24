"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-slate-200
          bg-white
          shadow-sm
          dark:border-white/10
          dark:bg-white/10
        "
      >
        <Sun className="h-5 w-5 text-[#18a999]" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="
        group relative flex h-10 w-10
        items-center justify-center
        overflow-hidden rounded-xl
        border border-slate-200
        bg-white
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-[#18a999]
        hover:shadow-md

        dark:border-white/10
        dark:bg-white/10
      "
    >
      <Sun
        className={`
          absolute h-5 w-5
          text-[#18a999]
          transition-all duration-300
          group-hover:rotate-45
          ${
            isDark
              ? "scale-0 rotate-90"
              : "scale-100 rotate-0"
          }
        `}
      />

      <Moon
        className={`
          absolute h-5 w-5
          text-[#35d0bd]
          transition-all duration-300
          ${
            isDark
              ? "scale-100 rotate-0"
              : "scale-0 rotate-90"
          }
        `}
      />
    </button>
  );
}