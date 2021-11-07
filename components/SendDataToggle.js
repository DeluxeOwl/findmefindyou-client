import { Layout, Toggle } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
export default function SendDataToggle() {
  const [activeChecked, setActiveChecked] = React.useState(true);

  const onActiveCheckedChange = (isChecked) => {
    setActiveChecked(isChecked);
  };
  return (
    <Layout>
      <Toggle
        style={styles.toggle}
        checked={activeChecked}
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
