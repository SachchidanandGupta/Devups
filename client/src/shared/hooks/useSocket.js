import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useAuth from "../../features/auth/hooks/useAuth";
import useAuthStore from "../../features/auth/store/authStore";
import useFriend from "../../features/friends/hooks/useFriend";
import useContest from "../../features/contest/hooks/useContest";
import useFriendStore from "../../features/friends/store/useFriendStore";
let socketInstance = null;

export const getSocket = () => socketInstance;

const useSocket = () => {
  const initialized = useRef(false);
  const { user, isAuthenticated, setUser } = useAuth();
  const { requestsPending } = useFriend();
  const { friendContest } = useContest();

  useEffect(() => {
    if (!isAuthenticated || !user?._id) return;
    if (initialized.current) return;

    socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      socketInstance.emit("join_room", user._id);
    });

    socketInstance.on("user:online", (userId) => {
      useFriendStore.getState().setFriendOnlineStatus(userId, true);
    });
    socketInstance.on("user:offline", (userId) => {
      useFriendStore.getState().setFriendOnlineStatus(userId, false);
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
    socketInstance.on("friend:friend_Request", async (data) => {
      await requestsPending();
    });

    socketInstance.on("friend:activity", () => {});
    socketInstance.on("contest:invite", async (data) => {
      await friendContest();
    });
    socketInstance.on("contest:deleted",async(data)=>{
      await friendContest();
    })
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
