import { Button, Icon } from "@ui-kitten/components";
import React from "react";
import env from "../env";
import { credStore } from "../stores/credStore";
import showToast from "../util/showToast";
import useFriends from "../hooks/useFriends";
import usePendingFriends from "../hooks/usePendingFriends";

const handleAction = async (uniqueKey, action, display_name) =>
  fetch(`${env.BACKEND_URL}/friend_req`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Key": uniqueKey,
    },
    body: JSON.stringify({
      friend_name: display_name,
      action: action,
    }),
  });

// TODO: api calls to delete
export default function NotificationAcceptDeleteButtons({ friendName }) {
  const uniqueKey = credStore((s) => s.uniqueKey);
  const { refetchFriends } = useFriends();
  const { refetchPendingFriends } = usePendingFriends();

  const handleAccept = async () => {
    await handleAction(uniqueKey, "accept", friendName);
    refetchFriends();
    refetchPendingFriends();
    showToast({
      topText: "Success",
      bottomText: `Accepted request from ${friendName}`,
      type: "success",
    });
  };
  const handleDecline = async () => {
    await handleAction(uniqueKey, "decline", friendName);
    refetchPendingFriends();
    showToast({
      topText: "Declined",
      bottomText: `Declined request from ${friendName}`,
      type: "error",
    });
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        style={{ marginRight: 5 }}
        accessoryRight={
          <Icon name="checkmark-outline" fill="white" stroke="white" />
        }
        status="success"
        onPress={handleAccept}
      />
      <Button
        size="small"
        accessoryRight={
          <Icon name="close-outline" fill="white" stroke="white" />
        }
        status="danger"
        onPress={handleDecline}
      />
    </React.Fragment>
  );
}
