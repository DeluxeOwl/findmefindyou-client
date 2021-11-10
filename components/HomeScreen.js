import { Divider, Layout } from "@ui-kitten/components";
import React from "react";
import AddUserID from "./AddUserID";
import BottomProfile from "./BottomProfile";
import UserList from "./UserList";
import SendDataToggle from "./SendDataToggle";
import { credStore } from "../stores/credStore";
export default function HomeScreen({ navigation }) {
  const displayName = credStore((s) => s.displayName);

  return (
    <React.Fragment>
      <Layout style={{ flex: 1 }} level="1">
        <UserList />
        <Divider />
        <AddUserID />
        <SendDataToggle />
        <Divider />
        <BottomProfile
          avatarUri="https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png"
          name={displayName}
          status="Last sync: 3m ago"
          notifNumber={1}
        />
      </Layout>
    </React.Fragment>
  );
}
