import { Divider, Layout } from "@ui-kitten/components";
import React from "react";
import NotificationScreenWarning from "./NotificationScreenWarning";
import NotificationList from "./NotificationList";
export default function NotificationScreen({ navigation }) {
  return (
    <Layout style={{ flex: 1 }} level="1">
      <NotificationScreenWarning
        info="Accept or decline friend requests."
        warning="Be careful of who has your location!"
      />
      <Divider />
      <NotificationList />
    </Layout>
  );
}
