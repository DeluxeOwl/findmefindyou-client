import { Layout, List, Text, Spinner } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import usePendingFriends from "../hooks/usePendingFriends";

import NotificationUserItem from "./NotificationUserItem";

export default function UserList() {
  const { pendingFriends, isLoading } = usePendingFriends();

  return (
    <Layout>
      {isLoading && (
        <Layout style={styles.loadingContainer}>
          <Text category="h3">Loading friends </Text>
          <Spinner size="giant" />
        </Layout>
      )}
      <List
        style={styles.container}
        data={pendingFriends}
        renderItem={NotificationUserItem}
      />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
