import {
  Avatar,
  Button,
  Card,
  Icon,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import shallow from "zustand/shallow";
import env from "../env.js";
import { credStore } from "../stores/credStore";
import { db } from "../stores/database";
import * as RootNavigation from "../util/RootNavigation";
import showToast from "../util/showToast";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT + STATUS_BAR_HEIGHT;

export default function BottomProfile({ name, notifNumber }) {
  // Last time synced
  const [lastSync, setLastSync, uniqueKey] = credStore(
    (s) => [s.lastSync, s.setLastSync, s.uniqueKey],
    shallow
  );

  // State of the modal for image upload
  const [visible, setVisible] = React.useState(false);

  const [avatarUri, setAvatarUri] = credStore((s) => [
    s.avatarUri,
    s.setAvatarUri,
  ]);

  React.useEffect(async () => {
    const res = await fetch(`${env.BACKEND_URL}/avatar_location`, {
      method: "GET",
      headers: {
        "X-Key": uniqueKey,
      },
    });
    const data = await res.json();
    setAvatarUri(`${env.BACKEND_URL}/${data["avatar_url"]}`);
  }, [visible]);

  // This use effect runs periodically and updates the 'last sync' status
  // it's a little bit finnicky ... make sure there is some data in the db
  React.useEffect(() => {
    // Needs plugin for relative time
    dayjs.extend(relativeTime);

    // TODO: fix promise rejection at _array[0]
    const id = setInterval(() => {
      db.transaction((tx) => {
        tx.executeSql(
          `select timestamp from coordinates order by timestamp desc limit 1`,
          [],
          (_, { rows: { _array } }) =>
            setLastSync(dayjs(_array[0]?.timestamp).toNow(true))
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

  const handleSelfPress = () => {
    RootNavigation.navigate("Map", {
      display_name: name,
      avatar_url: avatarUri,
      headerTitle: `Your routes`,
    });
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      try {
        const manipResult = await manipulateAsync(
          result.uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 1 }
        );

        console.log("Bottom profile, image ⟶ ", manipResult);
        // Get the fileName, basically an uuid with the extension
        const filename = manipResult.uri.split("/").pop();

        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append("photo", {
          uri: manipResult.uri,
          name: filename,
          type,
        });

        await fetch(`${env.BACKEND_URL}/upload_avatar`, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Key": uniqueKey,
          },
        });

        showToast({
          type: "success",
          topText: "Success",
          bottomText: "Image uploaded successfully!",
        });
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
              uri:
                avatarUri ||
                "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
            }}
          />
        </Pressable>

        <View style={styles.authoringInfoContainer}>
          <Pressable onPress={handleSelfPress}>
            <Text>{name}</Text>
          </Pressable>
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
