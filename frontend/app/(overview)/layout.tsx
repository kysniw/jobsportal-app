import React from "react";
import Header from "../components/header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="pt-20 min-h-screen">{children}</div>
    </div>
  );
}

export default Layout;
