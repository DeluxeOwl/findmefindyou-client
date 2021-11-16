import { Layout, List } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import UserItem from "./UserItem";
import { userStore } from "../stores/userStore";

export default function UserList() {
  const data = userStore((s) => s.data);

  return (
    <Layout style={styles.container}>
      <List data={data} renderItem={UserItem} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    maxHeight: 192 * 3,
    margin: 2,
  },
});
