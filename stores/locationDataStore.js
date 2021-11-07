import create from "zustand";

const useLocationDataStore = create((set) => ({
  toggled: true,
  toggleDataStore: () => set((state) => ({ toggled: !state.toggled })),
}));

export { useLocationDataStore };
