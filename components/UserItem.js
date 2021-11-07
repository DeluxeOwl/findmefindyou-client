import { ListItem } from "@ui-kitten/components";
import React from "react";
import UserIcon from "./UserIcon";
import UserDeleteButton from "./UserDeleteButton";
export default function UserItem({ item, index }) {
  return (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${Math.floor(
        Math.random() * 14 + 1
      )} hours ago.`}
      accessoryLeft={UserIcon}
      accessoryRight={<UserDeleteButton userID={`${index + 1}`} />}
      onPress={() => {
        console.warn(`Will view map for ${item.title} ${index + 1}`);
      }}
    />
  );
}
