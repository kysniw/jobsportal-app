import React from "react";
import Header from "../components/header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="min-h-screen pt-20 flex">
        <div className="basis-full p-4">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
