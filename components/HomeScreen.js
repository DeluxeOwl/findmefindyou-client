import { Button, Divider, Layout } from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { credStore } from "../stores/credStore";
import AddUserID from "./AddUserID";
import BottomProfile from "./BottomProfile";
import SendDataToggle from "./SendDataToggle";
import UserList from "./UserList";
import usePendingFriends from "../hooks/usePendingFriends";

export default function HomeScreen({ navigation }) {
  const displayName = credStore((s) => s.displayName);
  const { pendingFriends } = usePendingFriends();
  const notifNumber = pendingFriends?.length || 0;

  const deleteIDS = async () => {
    await SecureStore.deleteItemAsync("displayName");
    await SecureStore.deleteItemAsync("uniqueKey");
  };

  return (
    <React.Fragment>
      <Layout style={{ flex: 1 }} level="1">
        <UserList />
        <Divider />
        <AddUserID />
        <SendDataToggle />
        <Divider />
        <BottomProfile name={displayName} notifNumber={notifNumber} />
        <Button onPress={deleteIDS}>Delete account</Button>
      </Layout>
    </React.Fragment>
  );
}
