import create from "zustand";
import * as SecureStore from "expo-secure-store";
const credStore = create((set) => ({
  displayName: "",
  uniqueKey: "",
  avatarUri: null,
  lastSync: "never",
  setLastSync: (val) => {
    val !== null && set({ lastSync: val });
  },
  setAvatarUri: (val) => {
    set({ avatarUri: val });
  },
  fetchCreds: async () => {
    set({
      displayName: await SecureStore.getItemAsync("displayName"),
      uniqueKey: await SecureStore.getItemAsync("uniqueKey"),
    });
  },
}));

export { credStore };
