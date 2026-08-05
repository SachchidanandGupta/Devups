import React from "react";
import Navbar from "./Navbar";
import useSocket from "../hooks/useSocket";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  useSocket();
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Navbar />
      <main className="flex-1 relative flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
