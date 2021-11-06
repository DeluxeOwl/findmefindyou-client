import { Button, Icon, List, ListItem } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
// Mock data
const data = new Array(24).fill({
  title: "User",
  description: "Last seen",
});

const isOnline = true;

const renderItemAccessory = (props) => (
  <Button
    size="small"
    accessoryLeft={
      isOnline ? (
        <Icon name="checkmark-circle-2-outline" fill="green" stroke="green" />
      ) : (
        <Icon name="close-circle-outline" fill="red" stroke="red" />
      )
    }
    status="basic"
  >
    View map
  </Button>
);
const renderItemIcon = (props) => <Icon {...props} name="person" />;
const renderItem = ({ item, index }) => (
  <ListItem
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${Math.floor(
      Math.random() * 14 + 1
    )} hours ago.`}
    accessoryLeft={renderItemIcon}
    accessoryRight={renderItemAccessory}
  />
);
export default function UserList() {
  return <List style={styles.container} data={data} renderItem={renderItem} />;
}
const styles = StyleSheet.create({
  container: {
    maxHeight: 192 * 3,
  },
});
