import React from "react";
import { Input, Button, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};
export default function AddUserID() {
  const primaryInputState = useInputState();
  return (
    <React.Fragment>
      <Input
        style={styles.input}
        status="primary"
        placeholder="User id ..."
        {...primaryInputState}
      />
      <Button
        style={styles.button}
        appearance="outline"
        status="primary"
        accessoryLeft={<Icon name="plus" />}
      >
        Send request
      </Button>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    margin: 5,
  },
  button: {
    margin: 2,
  },
});
