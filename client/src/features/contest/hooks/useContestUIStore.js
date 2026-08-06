import { create } from "zustand";

const useContestUIStore = create((set) => ({
  selectedContestId: null,
  setSelectedContestId: (id) => set({ selectedContestId: id }),
}));

export default useContestUIStore;