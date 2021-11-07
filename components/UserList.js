import {
  Button,
  Icon,
  Layout,
  List,
  ListItem,
  Avatar,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
// Mock data
const data = new Array(24).fill({
  title: "User",
  description: "Last seen",
});

const isOnline = true;
// end Mock Data

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
// const renderItemIcon = (props) => <Icon {...props} name="person" />;
const renderItemIcon = (props) => (
  <Avatar
    style={{ margin: 2 }}
    size="small"
    source={{
      uri: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
    }}
  />
);
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
  return (
    <Layout>
      <List style={styles.container} data={data} renderItem={renderItem} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    maxHeight: 192 * 3,
    margin: 2,
  },
});
