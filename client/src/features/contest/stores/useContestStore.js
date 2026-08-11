import { create } from "zustand";

const useContestStore = create((set) => ({
  platformContests: [],
  incomingContests: [],
  activeContests: [],
  completedContests: [],
  hostedContests: [],
  isLoading: false,
  error: null,

  setPlatformContests: (data) => set({ platformContests: data }),
  setIncomingContests: (data) => set({ incomingContests: data }),
  setActiveContests: (data) => set({ activeContests: data }),
  setCompletedContests: (data) => set({ completedContests: data }),
  setHostedContests: (data) => set({ hostedContests: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),

  markProblemSolvedLocally: (contestId, userId, titleSlug) =>
    set((state) => ({
      activeContests: state.activeContests.map((contest) => {
        if (String(contest._id) !== String(contestId)) return contest;
        const scores = contest.scores || [];
        const existingIndex = scores.findIndex(
          (s) => String(s.userId?._id || s.userId) === String(userId),
        );
        const updatedScores =
          existingIndex >= 0
            ? scores.map((s, i) =>
                i === existingIndex
                  ? {
                      ...s,
                      solvedProblems: [...(s.solvedProblems || []), titleSlug],
                    }
                  : s,
              )
            : [...scores, { userId, solvedProblems: [titleSlug] }];
        return { ...contest, scores: updatedScores };
      }),
    })),
}));

export default useContestStore;