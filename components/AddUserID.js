import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  Modal,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import showToast from "../util/showToast";
import env from "../env";
import { credStore } from "../stores/credStore";

export default function AddUserID() {
  const uniqueKey = credStore((s) => s.uniqueKey);
  // The value of the user id
  const [value, setValue] = React.useState("");
  // State of the modal
  const [visible, setVisible] = React.useState(false);

  const handleSubmit = async () => {
    if (value.length < 10) {
      showToast({
        topText: "Error",
        type: "error",
        bottomText: `User id is too short`,
      });
    } else {
      await fetch(`${env.BACKEND_URL}/send_friend_req`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Key": uniqueKey,
        },
        body: JSON.stringify({
          friend_name: value,
        }),
      });

      showToast({
        topText: "Info",
        type: "info",
        bottomText: `Request sent to ${value}`,
      });
      setVisible(false);
      setValue("");
    }
  };

  return (
    <React.Fragment>
      <Layout style={styles.containerAdd}>
        <Button
          appearance="filled"
          status="primary"
          style={styles.buttonAdd}
          accessoryRight={<Icon name="plus" />}
          onPress={() => setVisible(true)}
        >
          Add a friend
        </Button>
      </Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        style={{ width: "80%" }}
        onBackdropPress={() => {
          setVisible(false);
          setValue("");
        }}
      >
        <Card disabled={true}>
          <Input
            style={styles.input}
            status="primary"
            placeholder="User id ..."
            label="Add a friend by entering their id"
            value={value}
            onChangeText={setValue}
          />

          <Button
            style={styles.button}
            appearance="outline"
            status="primary"
            onPress={handleSubmit}
          >
            Send request
          </Button>
          <Button
            style={styles.button}
            appearance="outline"
            status="danger"
            onPress={() => {
              setVisible(false);
              setValue("");
            }}
          >
            Dismiss
          </Button>
        </Card>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
  },
  button: {
    margin: 5,
  },
  buttonAdd: {
    width: "75%",
  },
  containerAdd: {
    flex: 0.05,
    alignItems: "center",
    marginVertical: "5%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
