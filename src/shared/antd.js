import { notification } from "antd";

export const openNotification = (type, description) =>
  notification[type]({
    description,
    className: type === "error" ? "ant-error" : type === "success" ? "ant-success" : "",
    duration: 5,
    placement: "bottomRight",
  });
