import { Badge } from "antd";

export const StatusBadge = ({ status, type = "default" }) => {
  const getColor = () => {
    if (type === "room") {
      switch (status) {
        case "available":
          return "green";
        case "occupied":
          return "red";
        case "cleaning":
          return "orange";
        case "maintenance":
          return "purple";
        case "out_of_order":
          return "volcano";
        default:
          return "default";
      }
    }
    return status ? "green" : "red";
  };

  return <Badge status={getColor()} text={status} />;
};