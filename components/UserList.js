import { Layout, List, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import UserItem from "./UserItem";

import useFriends from "../hooks/useFriends";

export default function UserList() {
  const { friends, isLoading } = useFriends();

  return (
    <Layout style={styles.container}>
      {isLoading && (
        <Layout style={styles.loadingContainer}>
          <Text category="h3">Loading friends </Text>
          <Spinner size="giant" />
        </Layout>
      )}
      <List data={friends} renderItem={UserItem} />
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    maxHeight: 192 * 3,
    margin: 2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
