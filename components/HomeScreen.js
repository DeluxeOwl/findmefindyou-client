import { Divider, Layout, Button } from "@ui-kitten/components";
import React from "react";
import AddUserID from "./AddUserID";
import BottomProfile from "./BottomProfile";
import UserList from "./UserList";
import SendDataToggle from "./SendDataToggle";
import { credStore } from "../stores/credStore";
import * as SecureStore from "expo-secure-store";


export default function HomeScreen({ navigation }) {
  const displayName = credStore((s) => s.displayName);
  

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
        <BottomProfile
          name={displayName}
          notifNumber={1}
        />
        <Button onPress={deleteIDS}>Delete account</Button>
      </Layout>
    </React.Fragment>
  );
}
