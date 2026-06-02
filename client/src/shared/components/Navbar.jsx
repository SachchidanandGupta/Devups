import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { PiRanking } from "react-icons/pi";
import { GoTrophy } from "react-icons/go";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FiLogOut } from "react-icons/fi";

import devUps from "../../assets/Devups(dark).png";
import useAuthStore from "../../features/auth/store/authStore";
import useAuth from "../../features/auth/hooks/useAuth";

const navItems = [
  { name: "Home", path: "/", icon: IoHomeOutline },
  { name: "Friends", path: "/friends", icon: LiaUserFriendsSolid },
  { name: "Leaderboard", path: "/leaderboard", icon: PiRanking },
  { name: "Contest", path: "/contest", icon: GoTrophy },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuthStore((state) => state) || {};

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-[240px] bg-zinc-950 border-r border-zinc-800/60 flex flex-col font-sans select-none z-50">
      <div className="p-6 pb-2">
        <img
          src={devUps}
          alt="DevUps"
          className="object-contain w-full drop-shadow-[0_0_12px_rgba(6,182,212,0.15)]"
        />
      </div>

      <div className="flex flex-col gap-2 p-3 mt-4 flex-grow">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "text-slate-500 hover:bg-zinc-900/50 hover:text-slate-300"
                }`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] opacity-100"
                      : "bg-transparent opacity-0 group-hover:bg-zinc-700 group-hover:opacity-100"
                  }`}
                ></div>

                <Icon
                  size={22}
                  className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
                />
                <p className="font-semibold text-sm tracking-wide">
                  {item.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3 bg-zinc-900/50 p-2.5 rounded-2xl border border-zinc-800/50">
          <Link to="/profile">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm bg-gradient-to-br from-zinc-700 to-zinc-800">
                  {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
            </div>
          </Link>

          <div className="flex flex-col flex-grow overflow-hidden">
            <p className="text-sm font-bold text-slate-200 truncate">
              {user.username || "Developer"}
            </p>
            <p className="text-xs font-semibold text-cyan-500/80">
              Lvl {user.level || 1}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
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
