import { Avatar, Button, Icon, Text, Card, Modal } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import * as RootNavigation from "../util/RootNavigation";
export default function BottomProfile({
  avatarUri,
  name,
  status,
  notifNumber,
}) {
  // State of the modal for image upload
  const [visible, setVisible] = React.useState(false);
  // We're using a reference to the react navigator to avoid
  // some hook errors
  const handleNav = () => {
    RootNavigation.navigate("Notifications");
  };
  return (
    <React.Fragment>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{ width: "80%" }}
        onBackdropPress={() => {
          setVisible(false);
        }}
      >
        <Card disabled={true}>
          <Button
            style={styles.button}
            appearance="outline"
            status="primary"
            accessoryLeft={<Icon name="cloud-upload-outline" />}
          >
            Upload image
          </Button>
        </Card>
      </Modal>
      <View style={styles.activityContainer}>
        <Pressable onPress={() => setVisible(true)}>
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
          onPress={handleNav}
        >
          {notifNumber === 0 ? "" : `${notifNumber} new`}
        </Button>
      </View>
    </React.Fragment>
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    margin: 5,
  },
});
