import { Layout, Text } from "@ui-kitten/components";
import React from "react";
export default function NotificationScreen({ navigation }) {
  return (
    <Layout
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      level="1"
    >
      <Text>Notification Screen for yourself</Text>
    </Layout>
  );
}
