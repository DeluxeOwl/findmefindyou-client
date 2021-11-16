import { Layout, Toggle } from "@ui-kitten/components";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as TaskManager from "expo-task-manager";
import React from "react";
import { StyleSheet } from "react-native";

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }

  console.log(locations);
});

export default function SendDataToggle() {
  const [toggled, setToggled] = React.useState(false);

  // Get the location toggle from the secure store and set the state
  React.useEffect(async () => {
    const storedToggle =
      (await SecureStore.getItemAsync("collectLocationBg")) === "true"
        ? true
        : false;
    console.log("SendDataToggle.js ⟶ found location toggle:", storedToggle);
    setToggled(storedToggle);
  }, []);

  const requestPermissions = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
      });
    }
  };

  // When you switch the toggle, set it in the store first, then update UI
  const onActiveCheckedChange = async () => {
    await SecureStore.setItemAsync("collectLocationBg", (!toggled).toString());
    setToggled((t) => !t);
  };
  return (
    <Layout styles={styles.container}>
      <Toggle
        style={styles.toggle}
        checked={toggled}
        onChange={onActiveCheckedChange}
      >
        Send location data in background
      </Toggle>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 0.05 },
  toggle: {
    marginVertical: "5%",
  },
});
