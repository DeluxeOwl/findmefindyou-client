import { Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import GenerateAccountButton from "./GenerateAccountButton";
import IHaveAkeyButton from "./IHaveAKeyButton";

export default function InitialScreen({ navigation }) {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text category="h2" style={styles.question}>
          Are you a new user of this application? 🙂
        </Text>

        <GenerateAccountButton text="Yes, generate account" />

        <IHaveAkeyButton text="No, I have a key" />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#083045",
  },
  question: {
    color: "white",
    textAlign: "center",
  },
});
