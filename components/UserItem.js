import { ListItem } from "@ui-kitten/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import env from "../env";
import * as RootNavigation from "../util/RootNavigation";
import UserDeleteButton from "./UserDeleteButton";
import UserIcon from "./UserIcon";

dayjs.extend(relativeTime);

export default function UserItem({ item, index }) {
  const handleNav = () => {
    RootNavigation.navigate("Map", {
      display_name: `${item.display_name}`,
      avatar_url: `${env.BACKEND_URL}/${item.avatar_url}`,
      headerTitle: `Map: ${item.display_name}`,
    });
  };

  return (
    <ListItem
      title={`${item.display_name}`}
      description={
        item.ts === null
          ? "last seen: never"
          : `last seen: ${dayjs(item.ts).toNow(true)} ago`
      }
      accessoryLeft={<UserIcon uri={`${env.BACKEND_URL}/${item.avatar_url}`} />}
      accessoryRight={
        <UserDeleteButton display_name={`${item.display_name}`} />
      }
      onPress={handleNav}
    />
  );
}
