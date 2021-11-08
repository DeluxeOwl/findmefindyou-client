import { Divider, Layout } from "@ui-kitten/components";
import React from "react";
import NotificationScreenWarning from "./NotificationScreenWarning";
export default function NotificationScreen({ navigation }) {
  return (
    <Layout
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      level="1"
    >
      <NotificationScreenWarning
        info="Accept or decline friend requests."
        warning="Be careful of who has your location!"
      />
      <Divider />
    </Layout>
  );
}
