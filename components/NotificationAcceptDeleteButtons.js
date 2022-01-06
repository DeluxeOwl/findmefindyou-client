import { Button, Icon } from "@ui-kitten/components";
import React from "react";
import showToast from "../util/showToast";

// TODO: add more parameters, such as username
export default function NotificationAcceptDeleteButtons({ requestID }) {
  const handleAccept = () => {
    showToast({
      topText: "Success",
      bottomText: `Accepted request from User ${requestID + 1}`,
      type: "success",
    });
  };
  const handleDecline = () => {
    showToast({
      topText: "Declined",
      bottomText: `Declined request from User ${requestID + 1}`,
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
