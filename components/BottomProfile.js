import {
  Avatar,
  Button,
  Card,
  Icon,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import * as RootNavigation from "../util/RootNavigation";
import showToast from "../util/showToast";
import { db } from "../stores/database";
import { credStore } from "../stores/credStore";
import shallow from "zustand/shallow";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { StatusBar, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

export default function BottomProfile({ avatarUri, name, notifNumber }) {
  // Last time synced
  const [lastSync, setLastSync] = credStore(
    (s) => [s.lastSync, s.setLastSync],
    shallow
  );

  // State of the modal for image upload
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = React.useState(null);

  // This use effect runs periodically and updates the 'last sync' status
  // it's a little bit finnicky ... make sure there is some data in the db
  React.useEffect(() => {
    // Needs plugin for relative time
    dayjs.extend(relativeTime);

    const id = setInterval(() => {
      db.transaction((tx) => {
        tx.executeSql(
          `select timestamp from coordinates order by timestamp desc limit 1`,
          [],
          (_, { rows: { _array } }) =>
            setLastSync(dayjs(_array[0]["timestamp"]).toNow(true))
        );
      });
    }, 30000);

    return () => {
      clearInterval(id);
    };
  }, []);

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
    <Layout style={styles.container}>
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
            {`Last sync: ${lastSync} ago`}
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
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: { flex: 0.1, marginBottom: BOTTOM_BAR_HEIGHT },
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
