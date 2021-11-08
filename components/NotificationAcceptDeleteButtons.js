import React from "react";
import { Icon, Button } from "@ui-kitten/components";

export default function NotificationAcceptDeleteButtons({ requestID }) {
  const handleAccept = () => {
    console.warn(`Accepted from id ${requestID}`);
  };
  const handleDecline = () => {
    console.warn(`Declined from id ${requestID}`);
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
