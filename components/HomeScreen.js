import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import React from "react";
import AddUserID from "./AddUserID";
import SendDataToggle from "./SendDataToggle";
import UserList from "./UserList";

export default function HomeScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  React.useEffect(() => {
    if (selectedIndex.row === 1) {
      navigation.navigate("Details");
    }
  }, [selectedIndex]);

  return (
    <React.Fragment>
      <Layout style={{ flex: 1 }} level="1">
        <Select
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          value="Go to ..."
        >
          <SelectItem title="Doesn't go anywhere" />
          <SelectItem title="Go to details" />
        </Select>

        <UserList />
        <AddUserID />

        <SendDataToggle />
      </Layout>
    </React.Fragment>
  );
}
