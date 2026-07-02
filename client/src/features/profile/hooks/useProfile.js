import useProfileStore from "../store/useProfileStore";
import {
  getUserActivity,
  getUserContestHistory,
  getUserFriends,
  getUserHeatMap,
  getUserLeetCalander,
  getUserLeetStats,
  getUserProfile,
} from "../api/profile.api";

const useProfile = () => {
  const profile = useProfileStore((state) => state.profile);
  const leetStats = useProfileStore((state) => state.leetStats);
  const leetCalander = useProfileStore((state) => state.leetCalander);
  const heatMap = useProfileStore((state) => state.heatMap);
  const friends = useProfileStore((state) => state.friends);
  const activity = useProfileStore((state) => state.activity);
  const contestHistory = useProfileStore((state) => state.contestHistory);
  const isLoading = useProfileStore((state) => state.isLoading);
  const error = useProfileStore((state) => state.error);
  const fetchProfileData = async (userId) => {
    useProfileStore.getState().setIsLoading(true);
    try {
      const results = await Promise.allSettled([
        getUserProfile(userId),
        getUserLeetStats(userId),
        getUserLeetCalander(userId),
        getUserHeatMap(userId),
        getUserFriends(userId),
        getUserContestHistory(userId),
        getUserActivity(userId),
      ]);
      const [
        profileRes,
        leetStatsRes,
        leetCalanderRes,
        heatMapRes,
        friendsRes,
        contestRes,
        activityRes,
      ] = results;

      useProfileStore
        .getState()
        .setProfile(
          profileRes.status === "fulfilled" ? profileRes.value.data.user : null,
        );
      useProfileStore
        .getState()
        .setLeetStats(
          leetStatsRes.status === "fulfilled"
            ? leetStatsRes.value.leetStats
            : null,
        );
      useProfileStore
        .getState()
        .setLeetCalander(
          leetCalanderRes.status === "fulfilled"
            ? leetCalanderRes.value.leetCalander
            : null,
        );
      useProfileStore
        .getState()
        .setHeatMap(
          heatMapRes.status === "fulfilled" ? heatMapRes.value.heatmap : [],
        );
      useProfileStore
        .getState()
        .setFriends(
          friendsRes.status === "fulfilled" ? friendsRes.value.friendList : [],
        );
      useProfileStore
        .getState()
        .setContestHistory(
          contestRes.status === "fulfilled"
            ? contestRes.value.contestHistory
            : [],
        );
      useProfileStore
        .getState()
        .setActivity(
          activityRes.status === "fulfilled"
            ? activityRes.value.activities
            : [],
        );
    } catch (error) {
      useProfileStore
        .getState()
        .setError(error.response?.data?.message || error.message);
    } finally {
      useProfileStore.getState().setIsLoading(false);
    }
  };

  return {
    fetchProfileData,
    profile,
    error,
    isLoading,
    activity,
    friends,
    leetCalander,
    leetStats,
    heatMap,
    contestHistory,
  };
};

export default useProfile;
