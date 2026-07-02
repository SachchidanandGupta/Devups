import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { HiOutlineTrophy, HiTrophy } from "react-icons/hi2";
import { IoPeopleOutline, IoPeople } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
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

const SideNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const { logout,user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-60 bg-black border-r border-border flex flex-col font-mono select-none z-50">
      <div className="pl-6 py-2">
        <p className="text-accent font-mono font-bold text-3xl ">DevUps</p>
        <p className="text-text-muted font-mono text-sm">Terminal v1.0.4</p>
      </div>

      <div className="flex flex-col gap-2 p-3 mt-4 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`relative flex items-center gap-3 pr-4 py-3 rounded-none  group overflow-hidden   ${
                  isActive
                    ? "text-accent border-l-2 border-accent pl-3"
                    : "text-text-primary hover:text-text-secondary hover:bg-accent pl-3"
                }`}
              >
                <Icon size={22} className={`${isActive ? "scale-95" : ""}`} />
                <p className="font-mono uppercase text-sm">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pb-2 border-t border-border bg-black">
        <div className="flex items-center gap-3 bg-black p-2 rounded-none">
          <button
            onClick={handleLogout}
            className="p-2 text-text-secondary gap-4 flex w-full items-center justify-items-start cursor-pointer hover:text-danger hover:bg-danger-dim rounded-none transition-colors duration-200"
            title="Logout"
          >
             <FiLogOut size={18} />LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
