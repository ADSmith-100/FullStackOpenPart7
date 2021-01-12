import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.content);
  const type = useSelector((state) => state.notification.type);
  if (!notification) {
    return null;
  }

  const style = {
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    color: type === "success" ? "green" : "red",
    background: "lightgrey",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
