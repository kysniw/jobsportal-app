import { checkAuthentication } from "@/app/utils/authorization";
import { permanentRedirect, redirect } from "next/navigation";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await checkAuthentication();

  if (!isAuthenticated) {
    permanentRedirect("/auth/login");
  }

  return <div className="h-full">{children}</div>;
}

export default Layout;
