import { Button, Card, Modal, Text } from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { StyleSheet } from "react-native";
import env from "../env.js";
import { credStore } from "../stores/credStore";
import showToast from "../util/showToast";

export default function GenerateAccountButton({ text }) {
  const [uniqueKey, setUniqueKey] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  // State of the modal
  const [visible, setVisible] = React.useState(false);

  const fetchCreds = credStore((s) => s.fetchCreds);

  // Fetch the credentials on component mount
  React.useEffect(() => {
    const fetchInitCreds = async () => {
      try {
        const creds = await fetch(`${env.BACKEND_URL}/init`);
        const { display_name, unique_key } = await creds.json();
        setDisplayName(display_name);
        setUniqueKey(unique_key);
      } catch (e) {
        showToast({
          type: "error",
          topText: "Error",
          bottomText: "Please restart the app",
        });
      }
    };
    fetchInitCreds().catch(console.log);
  }, []);

  const handleAccountCreation = async () => {
    if (uniqueKey === "" || displayName === "") {
      return;
    }

    try {
      await fetch(`${env.BACKEND_URL}/create_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: displayName,
          unique_key: uniqueKey,
        }), // body data type must match "Content-Type" header
      });
      // Set the items in the secure store
      await SecureStore.setItemAsync("displayName", displayName);
      await SecureStore.setItemAsync("uniqueKey", uniqueKey);

      await fetchCreds();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        style={styles.button}
        size="large"
        status="control"
        appearance="outline"
        onPress={() => {
          setVisible(true);
        }}
      >
        {text}
      </Button>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{ width: "80%" }}
        onBackdropPress={() => {
          setVisible(false);
        }}
      >
        <Card disabled={true}>
          <Text style={styles.textCenter}>
            Make sure to write down this key, otherwise you won't be able to
            access your account if you lose it!
          </Text>
          <Text style={styles.textKey}>{uniqueKey}</Text>
          <Button
            style={{ margin: 5 }}
            appearance="outline"
            status="primary"
            onPress={handleAccountCreation}
          >
            OK!
          </Button>
        </Card>
      </Modal>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 2,
    borderColor: "#eed369",
    borderRadius: 4,
    padding: 4,
    margin: "5%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textCenter: {
    textAlign: "center",
  },
  textKey: {
    textAlign: "center",
    fontFamily: "monospace",
    backgroundColor: "red",
    borderRadius: 4,
    padding: 4,
    marginVertical: "5%",
    color: "white",
  },
});
