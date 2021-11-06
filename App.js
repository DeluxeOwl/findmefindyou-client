import { StatusBar } from "expo-status-bar";
import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  List,
  ListItem,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const data = new Array(8).fill({
  title: "Item",
});

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
      <ListSimpleUsageShowcase />
      <StatusBar style="auto" />
    </ApplicationProvider>
  );
}

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text category="h1">HOME</Text>
  </Layout>
);

export const ListSimpleUsageShowcase = () => {
  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  return <List style={styles.container} data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
