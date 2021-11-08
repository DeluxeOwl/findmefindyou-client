import { ListItem } from "@ui-kitten/components";
import React from "react";
import UserIcon from "./UserIcon";

export default function NotificationItem({ item, index }) {
  return (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${Math.floor(
        Math.random() * 14 + 1
      )} hours ago.`}
      accessoryLeft={<UserIcon uri={item.uri} />}
    />
  );
}
