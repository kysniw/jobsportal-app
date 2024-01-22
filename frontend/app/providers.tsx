"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}
