import { Layout } from "@ui-kitten/components";
import React from "react";
import AddUserID from "./AddUserID";
import SendDataToggle from "./SendDataToggle";
import UserList from "./UserList";

export default function HomeScreen({ navigation }) {
  return (
    <React.Fragment>
      <Layout style={{ flex: 1 }} level="1">
        <UserList />
        <AddUserID />

        <SendDataToggle />
      </Layout>
    </React.Fragment>
  );
}
