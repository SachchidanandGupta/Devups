import {
  sendRequest,
  respondRequest,
  getFriends,
  blockUser,
  unFriend,
  pendingRequests,
} from "../api/friend.api";
import useFriendStore from "../store/useFriendStore";
import { useEffect } from "react";
import { getSocket } from "../../../shared/hooks/useSocket";
const useFriend = () => {
  const request = async (receiverId) => {
    useFriendStore.getState().setIsLoading(true);
    try {
      await sendRequest(receiverId);
    } catch (err) {
      useFriendStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useFriendStore.getState().setIsLoading(false);
    }
  };

  const requestsPending = async () => {
    useFriendStore.getState().setIsLoading(true);
    try {
      const data = await pendingRequests();
      useFriendStore.getState().setPendingFriendRequests(data.pendings || []);  // ✅
    } catch (err) {
      useFriendStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useFriendStore.getState().setIsLoading(false);
    }
  };

  const response = async (requestId, requestResponse) => {
    useFriendStore.getState().setIsLoading(true);
    try {
      await respondRequest(requestId, requestResponse);
    } catch (err) {
      useFriendStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useFriendStore.getState().setIsLoading(false);
    }
  };

  const fetchFriends = async () => {
    useFriendStore.getState().setIsLoading(true);
    try {
      const data = await getFriends();
      useFriendStore.getState().setFriends(data.friendList || []);
    } catch (err) {
      useFriendStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useFriendStore.getState().setIsLoading(false);
    }
  };

  const removeFriend = async (friendId) => {
    useFriendStore.getState().setIsLoading(true);
    try {
      await unFriend(friendId);
    } catch (err) {
      useFriendStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useFriendStore.getState().setIsLoading(false);
    }
  };

  const block = async (blockUserId) => {
    useFriendStore.getState().setIsLoading(true);
    try {
      await blockUser(blockUserId);
    } catch (err) {
      useFriendStore
        .getState()
        .setError(err.response?.data?.message || err.message);
    } finally {
      useFriendStore.getState().setIsLoading(false);
    }
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on("friend:activity", () => {
      fetchFriends();
    });
    return () => socket.off("friend:activity");
  }, []);

  return {
    request,
    fetchFriends,
    removeFriend,
    block,
    response,
    requestsPending,
  };
};

export default useFriend;
