import create from "zustand";

// Mock data
// TODO: hold it in a global state so
// you can update and re-render when you delete someone
// also, periodically fetch it
const userStore = create((set) => ({
  data: new Array(24).fill({
    title: "User",
    description: "Last seen",
  }),
}));

export { userStore };
