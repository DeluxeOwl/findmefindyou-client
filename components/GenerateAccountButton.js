import { Button, Card, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
export default function GenerateAccountButton({ text }) {
  // TODO: fetch this from backend using rquery
  const [uniqueKey, setUniqueKey] = React.useState("u7f8S7-dyds3");
  const [userDisplayName, setUserDisplayName] =
    React.useState("early-able-tiger");
  // State of the modal
  const [visible, setVisible] = React.useState(false);

  const handleAccountCreation = () => {
    console.warn(`
      1. Store the ${userDisplayName} and ${uniqueKey} in the secret store
      2. Should set some kind of global var to not show this page again in App.js and 
      show the rest of the navigator
      3. Should redirect to home
      `);
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
          console.warn("should fetch data");
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
