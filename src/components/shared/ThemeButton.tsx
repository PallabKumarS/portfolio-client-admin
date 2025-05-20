"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BsSun, BsMoonStars } from "react-icons/bs";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative overflow-hidden rounded-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: theme === "dark" ? -30 : 0,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute"
      >
        <BsSun className="h-[1.2rem] w-[1.2rem] text-orange-500" />
      </motion.div>

      <motion.div
        initial={{ y: 30 }}
        animate={{
          y: theme === "dark" ? 0 : 30,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="absolute"
      >
        <BsMoonStars className="h-[1.2rem] w-[1.2rem] text-slate-300" />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
