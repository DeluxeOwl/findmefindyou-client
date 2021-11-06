import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
  Button,
} from "@ui-kitten/components";
import React from "react";
import AddUserID from "./AddUserID";
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
      </Layout>
      <Layout style={{ flex: 5 }} level="1">
        <UserList />
      </Layout>
      <Layout style={{ flex: 2 }} level="1">
        <AddUserID />
      </Layout>
    </React.Fragment>
  );
}
