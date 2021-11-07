import { Layout, List } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import UserItem from "./UserItem";
import { userStore } from "../stores/userStore";

export default function UserList() {
  const data = userStore((s) => s.data);

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
