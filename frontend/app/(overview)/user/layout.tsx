import { checkAuthentication } from "@/app/utils/authorization";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

async function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await checkAuthentication();

  console.log(isAuthenticated);
  if (!isAuthenticated) {
    revalidatePath("/auth/login");
    redirect("/auth/login");
  }

  return <div>{children}</div>;
}

export default Layout;
