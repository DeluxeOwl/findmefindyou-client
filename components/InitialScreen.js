import { Text, Button } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function InitialScreen({ navigation }) {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text category="h2" style={styles.question}>
          Are you a new user of this application? 🙂
        </Text>

        <Button
          style={styles.button}
          size="large"
          status="control"
          appearance="outline"
        >
          Yes, generate account
        </Button>

        <Button status="basic" size="medium" appearance="ghost">
          No, I have a key
        </Button>
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
  button: {
    margin: 2,
    borderColor: "#eed369",
    borderRadius: 4,
    padding: 4,
    margin: "5%",
  },
});
