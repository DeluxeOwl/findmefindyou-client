import { Button, Card, Input, Modal } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import showToast from "../util/showToast";


export default function IHaveAkeyButton({ text }) {
  const [uniqueKey, setUniqueKey] = React.useState("");
  // State of the modal
  const [visible, setVisible] = React.useState(false);

  // TODO: fetch displayname, store with key in secret store
  // get the location data, store it in the db?
  // redirect to home screen
  // don't show this page again
  const handleAccountFetch = async () => {
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
            value={uniqueKey}
            onChangeText={setUniqueKey}
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
