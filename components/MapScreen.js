import { Layout, Text } from "@ui-kitten/components";
import React from "react";
export default function MapScreen({ route, navigation }) {
  const { userID } = route.params;

  return (
    <Layout
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      level="1"
    >
      <Text>Map Screen for userID: {userID}</Text>
    </Layout>
  );
}
