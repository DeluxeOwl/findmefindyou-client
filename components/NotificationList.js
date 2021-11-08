import { Layout, List } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import NotificationUserItem from "./NotificationUserItem";
import { notificationStore } from "../stores/notificationStore";

export default function UserList() {
  const data = notificationStore((s) => s.data);

  return (
    <Layout>
      <List
        style={styles.container}
        data={data}
        renderItem={NotificationUserItem}
      />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
