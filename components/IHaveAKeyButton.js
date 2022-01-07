import { Button, Card, Input, Modal } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import showToast from "../util/showToast";
import * as SecureStore from "expo-secure-store";
import { credStore } from "../stores/credStore";
import env from "../env";

export default function IHaveAkeyButton({ text }) {
  const [uniqueKeyInput, setUniqueKeyInput] = React.useState("");
  // State of the modal
  const [visible, setVisible] = React.useState(false);
  const fetchCreds = credStore((s) => s.fetchCreds);

  const handleAccountFetch = async () => {
    const res = await fetch(`${env.BACKEND_URL}/recover_account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unique_key: uniqueKeyInput,
      }),
    });

    const resJson = await res.json();

    if (resJson.result !== "error") {
      await SecureStore.setItemAsync("displayName", resJson.result);
      await SecureStore.setItemAsync("uniqueKey", uniqueKeyInput);
      await fetchCreds();
      return;
    }

    showToast({
      topText: "Error",
      type: "error",
      bottomText: `In case of fetching error`,
    });
  };
  return (
    <React.Fragment>
      <Button
        status="basic"
        size="medium"
        appearance="ghost"
        onPress={() => setVisible(true)}
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
          <Input
            style={styles.input}
            status="primary"
            placeholder="Secret key ..."
            label="Enter the secret key you wrote down"
            value={uniqueKeyInput}
            onChangeText={setUniqueKeyInput}
          />
          <Button
            style={{ margin: 5 }}
            appearance="filled"
            status="basic"
            onPress={handleAccountFetch}
          >
            Submit key
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

  input: {
    margin: 5,
  },
});
