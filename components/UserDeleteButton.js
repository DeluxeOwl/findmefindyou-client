import { Button, Card, Icon, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import env from "../env";
import { credStore } from "../stores/credStore";
import showToast from "../util/showToast";
import useFriends from "../hooks/useFriends";

export default function UserDeleteButton({ display_name }) {
  const uniqueKey = credStore((s) => s.uniqueKey);
  // State of the modal
  const [visible, setVisible] = React.useState(false);
  const { refetchFriends } = useFriends();

  const handleDelete = async () => {
    try {
      await fetch(`${env.BACKEND_URL}/delete_friend`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Key": uniqueKey,
        },
        body: JSON.stringify({
          friend_name: display_name,
        }),
      });
      refetchFriends();
      showToast({
        topText: "Deleted",
        bottomText: `Deleted User ${display_name}`,
        type: "error",
      });
    } catch (error) {
      console.log(error);
    }

    setVisible(false);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        accessoryRight={
          <Icon name="close-circle-outline" fill="red" stroke="red" />
        }
        status="basic"
        onPress={() => {
          setVisible(true);
        }}
      >
        Delete
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
          <Text category="s1">
            You won't be able to see each other's location. Are you sure?
          </Text>
          <Button
            style={styles.button}
            appearance="outline"
            status="danger"
            onPress={handleDelete}
          >
            Yes, delete it!
          </Button>
          <Button
            style={styles.button}
            appearance="outline"
            status="primary"
            onPress={() => {
              setVisible(false);
            }}
          >
            No, take me back.
          </Button>
        </Card>
      </Modal>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 5,
  },

  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
