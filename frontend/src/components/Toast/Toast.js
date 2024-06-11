import React, { useEffect, useState } from "react";

/**
 * props:
 * - text
 * - type
 */
function Toast(props) {
  const DEFAULT_NOTIFICATION = { type: "", text: "" };

  const [notification, setNotification] = useState(DEFAULT_NOTIFICATION);

  useEffect(() => {
    if (!notification.text) return;

    const notyf = new window.Notyf({
      position: {
        x: "right",
        y: "top",
      },
      duration: 0,
      types: [
        {
          type: "info",
          background: "blue",
          dismissible: true,
        },
        {
          type: "error",
          background: "red",
          dismissible: true,
        },
        {
          type: "success",
          background: "green",
          dismissible: true,
        },
      ],
    });

    notyf
      .open({
        type: notification.type,
        message: notification.text,
      })
      .on("dismiss", ({ target, event }) => {
        setNotification(DEFAULT_NOTIFICATION);
      });
    //setNotification(DEFAULT_NOTIFICATION);
  }, [notification]);

  useEffect(() => {
    setNotification({ type: props.type, text: props.text });
  }, [props.type, props.text]);

  return <React.Fragment></React.Fragment>;
}

export default Toast;
