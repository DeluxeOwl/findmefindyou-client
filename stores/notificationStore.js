import create from "zustand";

// Mock data
// TODO: hold it in a global state so
// you can update and re-render when you delete someone
// also, periodically fetch it
const notificationStore = create((set) => ({
  data: new Array(16).fill({
    title: "User",
    description: "Sent",
    uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
  }),
}));

export { notificationStore };
