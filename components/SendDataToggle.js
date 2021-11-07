import { Layout, Toggle } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { useLocationDataStore } from "../stores/locationDataStore";

export default function SendDataToggle() {
  const [activeChecked, setActiveChecked] = React.useState(true);
  const [toggled, toggleDataStore] = useLocationDataStore((s) => [
    s.toggled,
    s.toggleDataStore,
  ]);

  const onActiveCheckedChange = (isChecked) => {
    toggleDataStore(!toggled);
  };
  return (
    <Layout>
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
  toggle: {
    margin: "10%",
  },
});
