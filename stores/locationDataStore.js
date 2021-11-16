import create from "zustand";
import * as SecureStore from "expo-secure-store";

const useLocationDataStore = create((set) => ({
  toggled: false,
  toggleDataStore: async (currToggle) => {
    await SecureStore.setItemAsync("collectLocationBg", currToggle.toString());
    set({ toggled: currToggle });
  },
  initDataStore: async () => {
    const collectLocationBg =
      (await SecureStore.getItemAsync("collectLocationBg")) === "true"
        ? true
        : false;
    set({ toggled: collectLocationBg });
  },
}));

export { useLocationDataStore };
