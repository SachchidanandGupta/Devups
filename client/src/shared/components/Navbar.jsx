import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { HiOutlineTrophy, HiTrophy } from "react-icons/hi2";
import { IoPeopleOutline, IoPeople } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import useAuthStore from "../../features/auth/store/authStore";
import useAuth from "../../features/auth/hooks/useAuth";

const navItems = [
  { name: "Home", path: "/", icon: IoHomeOutline, activeIcon: IoHomeSharp },
  {
    name: "Friends",
    path: "/friends",
    icon: IoPeopleOutline,
    activeIcon: IoPeople,
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
    icon: MdOutlineLeaderboard,
    activeIcon: MdLeaderboard,
  },
  {
    name: "Contest",
    path: "/contest",
    icon: HiOutlineTrophy,
    activeIcon: HiTrophy,
  },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user) || {};

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-[240px] bg-black border-r border-border flex flex-col font-mono select-none z-50">
      <div className="p-6 pb-2">
        <p className="text-accent font-mono font-bold text-2xl ">DevUps</p>
        <p className="text-text-muted font-mono text-xs">Terminal v1.0.4</p>
      </div>

      <div className="flex flex-col gap-2 p-3 mt-4 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`relative flex items-center gap-3 pr-4 py-3 rounded-none  group overflow-hidden ${
                  isActive
                    ? "text-accent border-l-2 border-accent pl-3"
                    : "text-text-secondary hover:text-text-primary pl-3"
                }`}
              >
                <Icon size={22} className={`${isActive ? "scale-95" : ""}`} />
                <p className="font-mono uppercase text-sm">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-border bg-black">
        <div className="flex items-center gap-3 bg-black p-2 rounded-none">
          <Link to="/profile">
            <div className="relative w-10 h-10 rounded-none overflow-hidden bg-surface-2 border border-border flex-shrink-0">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary font-bold font-mono text-xl bg-surface-2">
                  {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent rounded-none border-2 border-black"></div>
            </div>
          </Link>

          <div className="flex flex-col flex-grow overflow-hidden">
            <p className="text-sm font-mono text-accent truncate">
              {user.username || "root@devups"}
            </p>
            <p className="text-xs font-bold font-mono text-text-muted">
              Lvl {user.level || 1}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-text-secondary hover:text-danger hover:bg-danger-dim rounded-none transition-colors duration-200"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
