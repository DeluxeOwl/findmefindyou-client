import { Button, Divider, Layout } from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { credStore } from "../stores/credStore";
import AddUserID from "./AddUserID";
import BottomProfile from "./BottomProfile";
import SendDataToggle from "./SendDataToggle";
import UserList from "./UserList";
import * as RootNavigation from "../util/RootNavigation";

export default function HomeScreen({ navigation }) {
  const [displayName, fetchCreds] = credStore((s) => [
    s.displayName,
    s.fetchCreds,
  ]);

  const deleteIDS = async () => {
    await SecureStore.deleteItemAsync("displayName");
    await SecureStore.deleteItemAsync("uniqueKey");
    await fetchCreds();
    RootNavigation.navigate("InitialScreen");
  };

  return (
    <React.Fragment>
      <Layout style={{ flex: 1 }} level="1">
        <UserList />
        <Divider />
        <AddUserID />
        <SendDataToggle />
        <Divider />
        <BottomProfile name={displayName} />
        <Button onPress={deleteIDS}>Delete account</Button>
      </Layout>
    </React.Fragment>
  );
}
