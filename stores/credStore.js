import create from "zustand";
import * as SecureStore from "expo-secure-store";
const credStore = create((set) => ({
  displayName: "",
  uniqueKey: "",
  fetchCreds: async () => {
    set({
      displayName: await SecureStore.getItemAsync("displayName"),
      uniqueKey: await SecureStore.getItemAsync("uniqueKey"),
    });
  },
}));

export { credStore };
