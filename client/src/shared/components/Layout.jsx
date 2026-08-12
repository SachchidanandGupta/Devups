import React, { useState } from "react";
import SideNavbar from "./Navbar";
import useSocket from "../hooks/useSocket";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  useSocket();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black overflow-hidden relative">
      <SideNavbar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 relative flex flex-col min-w-0">
        <TopBar onToggleMenu={() => setIsMobileMenuOpen((prev) => !prev)} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;