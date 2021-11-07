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
  <React.Fragment>
    <Button
      size="small"
      accessoryRight={
        <Icon name="close-circle-outline" fill="red" stroke="red" />
      }
      status="basic"
    >
      Delete
    </Button>
  </React.Fragment>
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
    onPress={() => {
      console.warn(`Pressed ${item.title} ${index + 1}`);
    }}
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
