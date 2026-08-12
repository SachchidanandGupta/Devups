import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { HiOutlineTrophy, HiTrophy } from "react-icons/hi2";
import { IoPeopleOutline, IoPeople } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import useAuth from "../../features/auth/hooks/useAuth";

const navItems = [
  { name: "Home", path: "/", icon: IoHomeOutline, activeIcon: IoHomeSharp },
  { name: "Friends", path: "/friends", icon: IoPeopleOutline, activeIcon: IoPeople },
  { name: "Leaderboard", path: "/leaderboard", icon: MdOutlineLeaderboard, activeIcon: MdLeaderboard },
  { name: "Contest", path: "/contest", icon: HiOutlineTrophy, activeIcon: HiTrophy },
];

const SideNavbar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-black border-r border-border-white flex flex-col font-sans select-none z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header & Mobile Close Button */}
        <div className="pl-6 pr-4 py-4 flex items-center justify-between border-b border-border-white/20 lg:border-none">
          <div>
            <p className="text-accent font-bold text-3xl">DevUps</p>
            <p className="text-text-secondary text-xs sm:text-sm">Terminal v1.0.4</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-text-primary hover:text-accent p-1 cursor-pointer"
            aria-label="Close menu"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-3 mt-2 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const currentPath = location.pathname;
            let isActive = false;
            if (currentPath === item.path) isActive = true;
            if (item.path !== "/" && currentPath.startsWith(`${item.path}/`)) isActive = true;

            const Icon = isActive ? item.activeIcon : item.icon;

            return (
              <Link to={item.path} key={item.name} onClick={onClose}>
                <div
                  className={`relative flex items-center gap-3 pr-4 py-3 rounded-none group overflow-hidden transition-colors ${
                    isActive
                      ? "text-accent border-l-2 border-accent pl-3 bg-surface-2/30"
                      : "text-text-primary hover:text-black hover:bg-accent pl-3"
                  }`}
                >
                  <Icon size={22} className={isActive ? "scale-95" : ""} />
                  <p className="uppercase text-sm font-bold tracking-wide">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-3 border-t border-border-white bg-black">
          <button
            onClick={() => {
              onClose();
              handleLogout();
            }}
            className="p-2.5 text-text-primary gap-3 flex w-full items-center justify-start cursor-pointer hover:text-danger hover:bg-danger-dim rounded-none transition-colors duration-200 font-bold text-sm"
            title="Logout"
          >
            <FiLogOut size={18} />
            LOGOUT
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;