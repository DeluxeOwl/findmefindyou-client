import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import React from "react";

export default function HomeScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  React.useEffect(() => {
    if (selectedIndex.row === 0) {
      navigation.navigate("Details");
    }
  }, [selectedIndex]);

  return (
    <Layout style={{ flex: 1 }} level="1">
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        value="Go to ..."
      >
        <SelectItem title="Go to details" />
        <SelectItem title="Doesn't go anywhere" />
      </Select>
      <Text style={{ margin: 5 }}>You're home!</Text>
    </Layout>
  );
}
