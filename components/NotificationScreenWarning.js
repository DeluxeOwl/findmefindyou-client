import { Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
export default function NotificationScreenWarning({ info, warning }) {
  return (
    <React.Fragment>
      <View>
        <Text style={styles.text} category="h3">
          {info}
        </Text>
      </View>
      <View>
        <Text style={styles.textWarn} category="s1">
          {warning}
        </Text>
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  text: {
    marginHorizontal: 1,
    marginTop: 20,
    textAlign: "center",
  },
  textWarn: {
    marginHorizontal: 1,
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    padding: 4,
    borderRadius: 5,
  },
});
