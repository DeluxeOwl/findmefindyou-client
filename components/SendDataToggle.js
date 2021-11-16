import { Layout, Toggle } from "@ui-kitten/components";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as TaskManager from "expo-task-manager";
import React from "react";
import { StyleSheet } from "react-native";
import showToast from "../util/showToast";

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

  // You better read through this code to understand
  const onActiveCheckedChange = async () => {
    // get the value of the next toggle
    const toggleNextVal = !toggled;

    // Ask for permission to collect location information in the bg
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      // set the nextval in store
      await SecureStore.setItemAsync(
        "collectLocationBg",
        toggleNextVal.toString()
      );
      // if the next value is true, start the task, otherwise stop it
      if (toggleNextVal) {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.High,
        });
      } else {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }
      // finally, update the UI
      setToggled((t) => toggleNextVal);
    } else {
      showToast({
        type: "error",
        topText: "Error",
        bottomText: "Need location permission",
      });
    }
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
