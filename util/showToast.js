import React from "react";
import Toast from "react-native-toast-message";

const showToast = ({ bottomText, topText, type }) => {
  Toast.show({
    type: type,
    text1: topText,
    text2: bottomText,
  });
};

export default showToast;
