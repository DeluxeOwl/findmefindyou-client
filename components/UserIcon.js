import { Avatar } from "@ui-kitten/components";
import React from "react";
export default function UserIcon({ uri }) {
  return (
    <Avatar
      style={{ margin: 2 }}
      size="small"
      source={{
        uri: uri,
      }}
    />
  );
}
