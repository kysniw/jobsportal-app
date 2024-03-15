import { checkAuthentication } from "@/app/utils/authorization";
import { redirect } from "next/navigation";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await checkAuthentication();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}

export default Layout;
