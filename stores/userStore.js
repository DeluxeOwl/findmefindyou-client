import create from "zustand";

// Mock data
// TODO: hold it in a global state so
// you can update and re-render when you delete someone
// also, periodically fetch it
const userStore = create((set) => ({
  data: new Array(24).fill({
    title: "User",
    description: "Last seen",
    uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
  }),
}));

export { userStore };
