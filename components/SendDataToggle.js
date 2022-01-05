import { Layout, Toggle } from "@ui-kitten/components";
import dayjs from "dayjs";
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

  console.log("⟶ Location info ----------");
  locations.forEach((locationObject) => {
    const latitude = locationObject?.coords.latitude;
    const longitude = locationObject?.coords.longitude;
    const timestamp = dayjs(locationObject?.timestamp)
      .format("YYYY-MM-DD HH:mm:ss.SSS")
      .toString();

    console.log(
      `latitude:${latitude} longitude:${longitude} timestamp:${timestamp}`
    );
  });
});

export default function SendDataToggle() {
  const [toggled, setToggled] = React.useState(false);
  const [statusBg, requestPermissionBg] = Location.useBackgroundPermissions();
  const [statusFg, requestPermissionFg] = Location.useForegroundPermissions();
  // Get the location toggle from the secure store and set the state
  React.useEffect(async () => {
    const storedToggle =
      (await SecureStore.getItemAsync("collectLocationBg")) === "true"
        ? true
        : false;
    // console.log("SendDataToggle.js ⟶ found location toggle:", storedToggle);
    setToggled(storedToggle);
  }, []);

  const toggleLocationCollection = async () => {
    // Ask for location permissions
    if (statusFg.granted === false || statusBg.granted === false) {
      try {
        await requestPermissionFg();
        await requestPermissionBg();
      } catch (error) {
        console.log(error);
        showToast({
          type: "error",
          topText: "Location error",
          bottomText: "Location is required at all times",
        });
        return;
      }
    }

    // get the value of the next toggle
    const toggleNextVal = !toggled;

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
  };
  return (
    <Layout styles={styles.container}>
      <Toggle
        style={styles.toggle}
        checked={toggled}
        onChange={toggleLocationCollection}
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
