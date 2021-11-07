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
const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export default function AddUserID() {
  const primaryInputState = useInputState();
  const [visible, setVisible] = React.useState(false);

  const handleSubmit = () => {
    console.warn(primaryInputState.value);
  };

  return (
    <React.Fragment>
      <Layout style={styles.containerAdd}>
        <Button
          appearance="filled"
          status="success"
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
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Input
            style={styles.input}
            status="primary"
            placeholder="User id ..."
            label="Add a friend by entering their id"
            {...primaryInputState}
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
            onPress={() => setVisible(false)}
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
    flex: 1,
    alignItems: "center",
    marginTop: "5%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
