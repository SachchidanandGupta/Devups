import React, { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import useContest from "../../contest/hooks/useContest";
import useProfile from "../hooks/useProfile";
import useFriend from "../../friends/hooks/useFriend";
import useLeaderboard from "../../leaderboard/hooks/useLeaderboard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { getLevelTitle } from "../../../shared/constants/levelTitles";
import { FaGithub } from "react-icons/fa";
import { Link, useParams } from "react-router";
import GithubHeatmap from "../../user/components/GithubHeatmap";
import TopBar from "../../../shared/components/TopBar";
import ProfileAvatar from "../components/ProfileAvatar";
import XPbar from "../../dashboard/components/XPBar2";
import PlatformCard from "../components/PlatformCard";
import Avatar from "../../../shared/components/Avatar";
import FriendStatusButton from "../components/FriendStatusButton";
import { ProfileSkeleton } from "../../../shared/ui/Skeleton";
const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { request, removeFriend, response } = useFriend();
  const { userContestHistory, completedContests } = useContest();
  const { globalRankings, fetchGlobal } = useLeaderboard();
  const {
    fetchProfileData,
    refetchFriendStatus,
    profile,
    isLoading,
    friends,
    isOwnProfile,
    friendStatus,
  } = useProfile();
  const joinedAt = profile?.createdAt?.slice(0, 10).replace(/-/g, ".");
  const usercode = profile?._id?.slice(0, 8);
  const rankIndex = globalRankings.findIndex(
    (f) => f._id.toString() === userId,
  );
  const globalRank = rankIndex !== -1 ? rankIndex + 1 : 0;
  const top = ((globalRank / globalRankings.length) * 100).toFixed(1);
  useEffect(() => {
    if (userId) {
      userContestHistory(userId);
      fetchProfileData(userId, user?._id);
      fetchGlobal();
    }
  }, [userId]);

  const {
    username = "Developer",
    avatar,
    level = 1,
    xp = 0,
    streak = 0,
    githubUsername,
    leetcodeUsername,
    codeforcesHandle,
  } = profile || {};

  const handleAddFriend = async () => {
    await request(userId);
    await refetchFriendStatus(userId);
  };

  const handleRemoveFriend = async () => {
    await removeFriend(userId);
    await refetchFriendStatus(userId);
  };

  const handleAccept = async () => {
    await response(userId, "accepted");
    await refetchFriendStatus(userId);
  };

  const handleReject = async () => {
    await response(userId, "rejected");
    await refetchFriendStatus(userId);
  };

  let logEntries = completedContests?.length;
  {
    logEntries < 10
      ? (logEntries = "00" + logEntries)
      : (logEntries = "0" + logEntries);
  }
  return (
    <div className="flex flex-col bg-black min-h-screen font-mono">
      <TopBar pageField={"system_user_terminal"} searchBar={true} />

      <div className="w-full p-4 gap-4 flex flex-col font-mono">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className="flex flex-col w-full gap-4">
            <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
              <div className="relative lg:col-span-2 flex flex-col justify-end border border-border bg-black">
                <div className="absolute right-0 top-0 border-l border-b border-border p-1.5 sm:p-2 text-[10px] sm:text-xs uppercase text-text-secondary tracking-widest bg-black">
                  secure_session_active
                </div>

                <div className="p-4 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 mt-8 sm:mt-0">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 min-w-0">
                    <ProfileAvatar data={profile} />
                    <div className="flex flex-col items-center sm:items-start gap-2 min-w-0">
                      <span className="text-text-primary font-bold uppercase text-4xl sm:text-6xl truncate max-w-full text-center sm:text-left">
                        {username}
                      </span>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 items-center mt-1">
                        <div className="text-black bg-accent px-3 py-1 text-xs sm:text-sm font-bold tracking-widest">
                          {getLevelTitle(level)}
                        </div>
                        <span className="text-accent text-lg sm:text-2xl font-bold shrink-0">
                          // LVL {level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isOwnProfile ? (
                    <div className="flex flex-col justify-end items-center sm:items-end shrink-0">
                      <button className="cursor-pointer flex items-center gap-3 border border-accent text-accent text-xs sm:text-sm font-bold tracking-widest px-4 py-2 hover:text-black hover:bg-accent transition-colors w-full sm:w-auto uppercase">
                        <span>EDIT_NODES</span> <IoSettingsOutline size={16} />
                      </button>
                    </div>
                  ) : (
                    <FriendStatusButton
                      friendStatus={friendStatus}
                      onAdd={handleAddFriend}
                      onRemove={handleRemoveFriend}
                      onAccept={handleAccept}
                      onReject={handleReject}
                    />
                  )}
                </div>
              </div>

              <div className="lg:col-span-1 flex flex-col gap-2 font-mono border border-border p-4 bg-black">
                <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm min-w-0">
                  <span className="text-text-secondary shrink-0">_id:</span>
                  <span className="text-text-primary truncate ml-2">
                    {usercode}
                  </span>
                </div>
                <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm">
                  <span className="text-text-secondary">joined:</span>
                  <span className="text-text-primary truncate ml-2">
                    {joinedAt}
                  </span>
                </div>
                <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm">
                  <span className="text-text-secondary">uplink:</span>
                  <span className="text-accent truncate ml-2 font-bold">
                    ACTIVE_SECURE
                  </span>
                </div>
                <div className="flex p-2 justify-between items-center border-b border-border text-xs sm:text-sm">
                  <span className="text-text-secondary shrink-0">
                    platform:
                  </span>
                  <span className="text-text-primary truncate ml-2">
                    CYBERSPACE_DEVUPS
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
                  <div className="w-2.5 h-2.5 bg-accent animate-pulse"></div>
                  <span className="text-text-muted text-[10px] sm:text-xs tracking-widest uppercase">
                    SYSTEM OPERATIONAL
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 border border-border p-4 sm:p-6 flex flex-col gap-4 bg-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-base sm:text-lg text-accent font-bold tracking-widest">
                    EXTERNAL_SYNC_NODES
                  </span>
                  <span className="text-text-muted text-[10px] sm:text-xs uppercase tracking-widest">
                    STATUS: SYNCHRONIZED
                  </span>
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <PlatformCard
                    platfrom={"github"}
                    platfromUsername={githubUsername}
                    style={"text-text-secondary"}
                  />
                  <PlatformCard
                    platfrom={"leetcode"}
                    platfromUsername={leetcodeUsername}
                    style={"text-warning"}
                  />
                  <PlatformCard
                    platfrom={"codeforces"}
                    platfromUsername={codeforcesHandle}
                    style={"text-danger"}
                  />
                </div>
              </div>

              <div className="lg:col-span-1 border border-border flex flex-col items-center justify-center p-6 gap-6 bg-black">
                <div className="flex flex-col gap-1 items-center justify-center text-center">
                  <span className="text-text-secondary text-sm sm:text-base uppercase tracking-widest">
                    global_ranking
                  </span>
                  <span className="text-accent font-bold text-5xl sm:text-6xl">
                    #{globalRank}
                  </span>
                  <span className="text-text-primary text-xs sm:text-sm mt-2 tracking-widest uppercase">
                    top {top}% // {globalRankings.length} users
                  </span>
                </div>
                <div className="w-full">
                  <XPbar user={profile} />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col lg:grid lg:grid-cols-4 gap-4 h-54">
              {profile?.githubUsername ? (
                <div className="lg:col-span-3  bg-black ">
                  {userId && <GithubHeatmap userId={userId} />}
                </div>
              ) : (
                <div className="lg:col-span-3 flex flex-col gap-4 p-4 bg-black border border-border">
                  <div className="text-accent font-bold tracking-widest">
                    COMMIT_VELOCITY // LINK_REQUIRED
                  </div>
                  <div className="border border-dashed border-accent-dim flex flex-col gap-4 items-center justify-center w-full min-h-[200px]">
                    <span className="text-text-muted animate-pulse font-bold tracking-widest">
                      [NO_DATA_SIGNAL]
                    </span>
                    <button className="text-accent border flex gap-2 items-center border-accent px-5 py-2 cursor-pointer hover:bg-accent hover:text-black transition-colors uppercase font-bold tracking-wider active:bg-danger active:text-text-primary active:border-danger">
                      <FaGithub size={16} />
                      <span>INITIALIZE_GITHUB_NODE</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="lg:col-span-1 border border-border bg-black flex flex-col min-h-[200px] max-h-[300px]">
                <div className="text-accent text-sm sm:text-base font-bold tracking-widest flex items-center justify-between p-3 border-b border-border uppercase">
                  <span>connected_peers</span>
                  <div className="text-text-secondary hover:bg-accent hover:text-black cursor-pointer transition-colors p-1 border border-transparent hover:border-accent">
                    <BsThreeDotsVertical />
                  </div>
                </div>

                {friends.length > 0 ? (
                  <div className=" overflow-y-auto scrollbar-none">
                    {friends.map((item) => (
                      <Link key={item._id} to={`/profile/${item._id}`}>
                        <div className="p-3 border-b border-border flex gap-4 items-center hover:bg-surface-2 transition-colors">
                          <div>
                            <Avatar data={item} />
                          </div>
                          <div className="flex flex-col justify-start">
                            <span className="text-accent text-sm font-bold uppercase tracking-wider">
                              {item.username}
                            </span>
                            <span className="text-text-primary text-[10px] uppercase tracking-widest">
                              LVL {item.level}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 p-4 flex items-center justify-center text-text-muted text-xs tracking-widest uppercase">
                    NO_PEERS_DETECTED
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 uppercase">
              <div className="border border-border p-4 sm:p-6 flex flex-col gap-4 bg-black">
                <div className="flex justify-between items-center  pb-4">
                  <div className="text-accent sm:text-lg font-bold tracking-widest">
                    ARCHIVE_PROTOCOL // CONTEST_HISTORY
                  </div>
                  <div className="text-text-muted text-xs tracking-widest">
                    LOG_ENTRIES: {logEntries}
                  </div>
                </div>

                <div>
                  {completedContests?.length > 0 ? (
                    <div>
                      <div className="w-full grid grid-cols-5 items-start border-b border-border py-2 mb-4 bg-surface-2 px-2">
                        <span className="col-span-1 text-text-muted text-xs tracking-widest">
                          contest_id
                        </span>
                        <span className="col-span-1 text-text-muted text-xs tracking-widest">
                          node-ranking
                        </span>
                        <span className="col-span-1 text-text-muted text-xs tracking-widest">
                          bit_yield
                        </span>
                        <span className="col-span-1 text-text-muted text-xs tracking-widest">
                          peak_throughput
                        </span>
                        <span className="col-span-1 text-text-muted text-xs tracking-widest">
                          protocol_result
                        </span>
                      </div>

                      {completedContests.map((contest, index) => {
                        let protocol_result = "sync_completed";
                        let result_css =
                          "border border-border text-text-secondary";

                        if (contest.userRank === null) {
                          protocol_result = "log_failed";
                          result_css = "border border-border text-text-muted";
                        } else if (contest.userRank == 1) {
                          protocol_result = "optimal_uplink";
                          result_css =
                            "border border-accent text-accent bg-accent/10 ";
                        } else if (
                          contest.userRank > 1 &&
                          contest.userRank < 4
                        ) {
                          protocol_result = "parity_established";
                          result_css =
                            "border border-warning text-warning bg-warning/10";
                        }

                        const highestScore = Math.max(
                          ...contest.scores.map((score) => score.xpEarned),
                        );
                        const userScore =
                          contest.scores.find(
                            (score) =>
                              score.userId.toString() === user._id.toString(),
                          )?.xpEarned ?? 0;

                        return (
                          <div className="w-full grid grid-cols-5 items-center border-b border-border py-3 px-2 hover:bg-surface-2 transition-colors">
                            <span className="col-span-1 text-sm text-text-primary font-bold truncate pr-2">
                              {contest.contestName}
                            </span>
                            <span className="col-span-1 text-text-muted text-sm font-mono">
                              <span className="text-text-primary">
                                #{contest.userRank}
                              </span>{" "}
                              / {contest.participants?.length}
                            </span>
                            <span className="col-span-1 text-sm text-accent font-bold">
                              + {userScore}{" "}
                              <span className="text-[10px] text-text-muted uppercase">
                                xp
                              </span>
                            </span>
                            <span className="col-span-1 text-text-primary text-sm font-mono">
                              {((highestScore / contest.target) * 100).toFixed(
                                1,
                              )}
                              %
                            </span>
                            <div className="col-span-1 flex text-xs items-center">
                              <span
                                className={`${result_css} px-2 py-1 tracking-widest`}
                              >
                                {protocol_result}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="w-full flex flex-col gap-4 uppercase items-center justify-center min-h-[200px] border border-dashed border-accent-dim">
                      <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
                        <span className="text-accent font-bold tracking-widest">
                          no_log_data_detected
                        </span>
                        <span className="text-text-muted text-xs tracking-widest">
                          user has not participated in any active or historical
                          contest protocol
                        </span>
                      </div>
                      <button className="px-4 py-2 border border-accent text-accent text-xs font-bold tracking-widest hover:bg-accent hover:text-black transition-colors cursor-pointer active:bg-danger active:text-text-primary active:border-danger">
                        INITIALIZE_FIRST_CONTEST_UPLINK
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
