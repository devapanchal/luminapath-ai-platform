"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle color theme"
      className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/75 text-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/10 dark:text-white"
      onClick={() => setDark((value) => !value)}
      type="button"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
