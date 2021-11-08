import { Avatar, Button, Icon, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View, Pressable } from "react-native";

export default function BottomProfile({
  avatarUri,
  name,
  status,
  notifNumber,
}) {
  return (
    <View style={styles.activityContainer}>
      <Pressable onPress={() => console.warn("Pressed own avatar")}>
        <Avatar
          source={{
            uri: avatarUri,
          }}
        />
      </Pressable>
      <View style={styles.authoringInfoContainer}>
        <Text>{name}</Text>
        <Text appearance="hint" category="p2">
          {status}
        </Text>
      </View>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={
          <Icon
            fill={(notifNumber !== 0 && "red") || "gray"}
            stroke={(notifNumber !== 0 && "red") || "gray"}
            name="bell-outline"
          />
        }
      >
        {notifNumber === 0 ? "" : `${notifNumber} new`}
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  authoringInfoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
