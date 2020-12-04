import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notificaton = () => {
  const notification = useSelector((state) => state.notification.message);
  const notificationType = useSelector((state) => state.notification.type);

  return (
    <div>
      {notification[notification.length - 1] && notificationType ? (
        notificationType !== "error" ? (
          <Alert variant={"success"}>
            {notification[notification.length - 1]}
          </Alert>
        ) : (
          <Alert variant={"danger"}>
            {notification[notification.length - 1]}
          </Alert>
        )
      ) : null}
    </div>
  );
};

export default Notificaton;
