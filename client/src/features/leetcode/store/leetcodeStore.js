import { create } from "zustand";

const leetcodeStore = create((set) => ({
  daily: null,
  isLoading: false,
  error: null,
  problemsSearch: [],
  searchLoading: false,
  allTags: [],
  tagsLoading: false,
  selectedTags: [],
  exploreSearchText: "",
  exploreResults: [],
  exploreLoading: false,

  setSearchLoading: (bool) => set({ searchLoading: bool }),
  setDaily: (data) => set({ daily: data }),
  setProblemSearch: (data) => set({ problemsSearch: data }),
  setIsLoading: (bool) => set({ isLoading: bool }),
  setError: (error) => set({ error: error }),

  setAllTags: (data) => set({ allTags: data }),
  setTagsLoading: (bool) => set({ tagsLoading: bool }),
  setExploreSearchText: (text) => set({ exploreSearchText: text }),
  setExploreResults: (data) => set({ exploreResults: data }),
  setExploreLoading: (bool) => set({ exploreLoading: bool }),

  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
    })),
}));

export default leetcodeStore;
