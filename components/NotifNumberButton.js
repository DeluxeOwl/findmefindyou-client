import { Button, Icon, Spinner, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import * as RootNavigation from "../util/RootNavigation";
import useSWR from "swr";
import env from "../env";
import { credStore } from "../stores/credStore";

const fetcher = (url, uniqueKey) =>
  fetch(url, { headers: { "X-Key": uniqueKey } }).then((res) => res.json());

export default function NotifNumberButton() {
  const uniqueKey = credStore((s) => s.uniqueKey);
  const { data, error } = useSWR(
    [`${env.BACKEND_URL}/pending_friends_number`, uniqueKey],
    fetcher
  );

  const handleNav = () => {
    RootNavigation.navigate("Notifications");
  };

  if (error) {
    return <Text>error</Text>;
  }
  if (!error && !data) {
    return <Spinner />;
  }

  return (
    <Button
      style={styles.iconButton}
      appearance="ghost"
      status="basic"
      accessoryLeft={
        <Icon
          fill={(data?.result !== 0 && "red") || "gray"}
          stroke={(data?.result !== 0 && "red") || "gray"}
          name="bell-outline"
        />
      }
      onPress={handleNav}
    >
      {data?.result === 0 ? "" : `${data?.result} new`}
    </Button>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    paddingHorizontal: 0,
  },
});
