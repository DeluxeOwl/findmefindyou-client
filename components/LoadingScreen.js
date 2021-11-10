import { Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
export default function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5%",
      }}
    >
      <Text category="h1">Loading</Text>
      <Spinner size="giant" />
    </View>
  );
}
