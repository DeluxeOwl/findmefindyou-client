import { ListItem } from "@ui-kitten/components";
import React from "react";
import NotificationAcceptDeleteButtons from "./NotificationAcceptDeleteButtons";
import UserIcon from "./UserIcon";
import env from "../env";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function NotificationItem({ item, index }) {
  return (
    <ListItem
      title={`${item.display_name}`}
      description={`sent ${dayjs(item.sent_at).toNow(true)} ago`}
      accessoryLeft={<UserIcon uri={`${env.BACKEND_URL}/${item.avatar_url}`} />}
      accessoryRight={
        <NotificationAcceptDeleteButtons friendName={`${item.display_name}`} />
      }
    />
  );
}
