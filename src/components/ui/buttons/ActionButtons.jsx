import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tooltip } from "antd";

const ActionButtons = ({
  record,
  onEdit,
  onDelete,
  onView,
  showView = false,
}) => (
  <Space>
    {showView && (
      <Tooltip title="View Details">
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onView?.(record)}
          className="text-blue-500 hover:text-blue-700"
        />
      </Tooltip>
    )}
    <Tooltip title="Edit">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => onEdit(record)}
        className="text-green-500 hover:text-green-700"
      />
    </Tooltip>
    <Popconfirm
      title="Are you sure you want to delete this record?"
      onConfirm={() => onDelete(record)}
      okText="Yes"
      cancelText="No"
    >
      <Tooltip title="Delete">
        <Button
          type="text"
          icon={<DeleteOutlined />}
          className="text-red-500 hover:text-red-700"
        />
      </Tooltip>
    </Popconfirm>
  </Space>
);

export default ActionButtons;
