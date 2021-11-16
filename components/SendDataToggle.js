import { Layout, Toggle } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { useLocationDataStore } from "../stores/locationDataStore";

export default function SendDataToggle() {
  const [toggled, toggleDataStore, initDataStore] = useLocationDataStore(
    (s) => [s.toggled, s.toggleDataStore, s.initDataStore]
  );

  React.useEffect(async () => {
    await initDataStore();
  }, []);

  const onActiveCheckedChange = async () => {
    await toggleDataStore(!toggled);
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
