import { ListItem } from "@ui-kitten/components";
import React from "react";
import UserIcon from "./UserIcon";
import UserDeleteButton from "./UserDeleteButton";
import * as RootNavigation from "../util/RootNavigation";

export default function UserItem({ item, index }) {
  const handleNav = () => {
    RootNavigation.navigate("Map", {
      userID: `${index + 1}`,
      headerTitle: `Map: UserID ${index + 1}`,
    });
  };

  return (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${Math.floor(
        Math.random() * 14 + 1
      )} hours ago.`}
      accessoryLeft={<UserIcon uri={item.uri} />}
      accessoryRight={<UserDeleteButton userID={`${index + 1}`} />}
      onPress={handleNav}
    />
  );
}
