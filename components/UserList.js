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
import UserItem from "./UserItem";
// Mock data
// TODO: hold it in a global state so
// you can update and re-render when you delete someone
// also, periodically fetch it
const data = new Array(24).fill({
  title: "User",
  description: "Last seen",
});
// end Mock Data

export default function UserList() {
  return (
    <Layout>
      <List style={styles.container} data={data} renderItem={UserItem} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    maxHeight: 192 * 3,
    margin: 2,
  },
});
