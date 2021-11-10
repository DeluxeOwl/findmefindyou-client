import { Avatar, Button, Card, Icon, Modal, Text } from "@ui-kitten/components";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import * as RootNavigation from "../util/RootNavigation";
import showToast from "../util/showToast";

export default function BottomProfile({
  avatarUri,
  name,
  status,
  notifNumber,
}) {
  // State of the modal for image upload
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = React.useState(null);
  // We're using a reference to the react navigator to avoid
  // some hook errors
  const handleNav = () => {
    RootNavigation.navigate("Notifications");
  };

  // Asks for permission to use the camera
  const handleAvatarClick = () => {
    setVisible(true);
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          setVisible(false);
          showToast({
            type: "error",
            topText: "Error",
            bottomText:
              "Sorry, we need camera roll permissions to make this work!",
          });
        }
      }
    })();
  };
  // TODO: consider encoding it as base64
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0,
    });

    if (!result.cancelled) {
      try {
        const manipResult = await manipulateAsync(
          result.uri,
          [{ resize: { width: 100, height: 100 } }],
          { compress: 1 }
        );
        setImage(manipResult.uri);

        showToast({
          type: "success",
          topText: "Success",
          bottomText: "Image uploaded successfully!",
        });

        console.log(manipResult);
      } catch (error) {
        showToast({
          type: "error",
          topText: "Error",
          bottomText: `${error}`,
        });
      }
    }

    setVisible(false);
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
            onPress={pickImage}
          >
            Upload image
          </Button>
        </Card>
      </Modal>
      <View style={styles.activityContainer}>
        <Pressable onPress={handleAvatarClick}>
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
