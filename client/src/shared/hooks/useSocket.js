import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useAuth from "../../features/auth/hooks/useAuth";
import useAuthStore from "../../features/auth/store/authStore";
let socketInstance = null;

export const getSocket = () => socketInstance;

const useSocket = () => {
  const initialized = useRef(false);
  const { user, isAuthenticated, setUser } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?._id) return;
    if (initialized.current) return;

    socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      socketInstance.emit("join_room", user._id);
    });

    socketInstance.on(
      "xp:updated",
      ({ xp, level, amount, source, currentXP, requiredXP }) => {
        setUser({
          ...useAuthStore.getState().user,
          xp,
          level,
          currentXP,
          requiredXP,
        });
      },
    );

    socketInstance.on("leaderboard:refresh", () => {});

    socketInstance.on("friend:activity", () => {});

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    initialized.current = true;

    return () => {
      socketInstance?.disconnect();
      socketInstance = null;
      initialized.current = false;
    };
  }, [isAuthenticated, user?._id]);
};

export default useSocket;
