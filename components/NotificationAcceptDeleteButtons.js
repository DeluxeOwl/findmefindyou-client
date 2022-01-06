import { Button, Icon } from "@ui-kitten/components";
import React from "react";
import showToast from "../util/showToast";

// TODO: api calls to delete
export default function NotificationAcceptDeleteButtons({ friendName }) {
  const handleAccept = () => {
    showToast({
      topText: "Success",
      bottomText: `Accepted request from ${friendName}`,
      type: "success",
    });
  };
  const handleDecline = () => {
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
