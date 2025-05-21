"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {children}
      <Toaster richColors position="top-right" closeButton dir="ltr" />
    </ThemeProvider>
  );
};

export default Providers;
