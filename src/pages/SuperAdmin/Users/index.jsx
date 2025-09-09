import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { Mail, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { useTableData } from "../../../hooks/useTableData";
import { formatDateTime } from "../../../utils/formatDate";
import { StatusBadge } from "../../../components/ui/badges/StatusBadge";
import { getUsersValues } from "../../../services/api/axios";
import { USER_ROLES } from "../../../lib/constants";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Mock Data - In a real app, this would come from your API
const initialData = {
  branches: [
    {
      branchId: 1,
      branchCode: "BR001",
      branchName: "Metro Manila Branch",
      address: "123 EDSA, Quezon City",
      city: "Quezon City",
      region: "NCR",
      contactNumber: "+63 2 1234 5678",
      email: "metro@hotel.com",
      operatingHours: "24/7",
      amenities: JSON.stringify(["WiFi", "Parking", "Restaurant"]),
      isActive: true,
      createdAt: "2024-01-15T08:00:00Z",
    },
  ],
  roomTypes: [
    {
      roomTypeId: 1,
      roomTypeCode: "STD",
      roomTypeName: "Standard Room",
      description: "Comfortable standard room with basic amenities",
      bedConfiguration: "Queen Bed",
      maxOccupancy: 2,
      roomSize: "25 sqm",
      amenities: JSON.stringify(["AC", "TV", "WiFi"]),
      features: JSON.stringify(["Private Bathroom", "Mini Fridge"]),
      imageUrl: "/images/standard-room.jpg",
      isActive: true,
      branchId: 1,
    },
  ],
  rateTypes: [
    {
      rateTypeId: 1,
      rateTypeCode: "HR3",
      rateTypeName: "3-Hour Rate",
      duration: 3,
      durationType: "hours",
      dayType: "weekday",
      description: "Standard 3-hour rate for weekdays",
    },
  ],
  rates: [
    {
      rateId: 1,
      roomTypeId: 1,
      rateTypeId: 1,
      branchId: 1,
      baseRate: 1500.0,
      currency: "PHP",
      effectiveFrom: "2024-01-01",
      effectiveTo: "2024-12-31",
      isActive: true,
    },
  ],
  rooms: [
    {
      roomId: 1,
      branchId: 1,
      roomNumber: "101",
      floor: "1st Floor",
      roomTypeId: 1,
      roomStatus: "available",
      lastCleaned: "2024-01-15T10:00:00Z",
      maintenanceStatus: "none",
      notes: "",
      isActive: true,
    },
  ],
  users: [
    {
      userId: 1,
      username: "admin",
      role: "superAdmin",
      branchId: null,
      firstName: "John",
      lastName: "Doe",
      email: "admin@hotel.com",
      contactNumber: "+63 9123456789",
      isActive: true,
      lastLogin: "2024-01-15T08:30:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],
  promotions: [
    {
      promoId: 1,
      promoCode: "WELCOME20",
      promoName: "Welcome Discount",
      promoType: "percentage",
      discountValue: 20,
      minimumStayHours: 3,
      applicableRoomTypes: JSON.stringify([1]),
      applicableBranches: JSON.stringify([1]),
      validFrom: "2024-01-01T00:00:00Z",
      validTo: "2024-12-31T23:59:59Z",
      usageLimit: 100,
      currentUsage: 15,
      dayTypeRestriction: null,
      requiresVerification: false,
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
  ],
  additionalServices: [
    {
      serviceId: 1,
      serviceName: "Extra Guest",
      serviceType: "extra_guest",
      basePrice: 500.0,
      isPerItem: true,
      isActive: true,
    },
  ],
};

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
  </Space>
);

const FilterBar = ({ onSearch, onFilter, children }) => (
  <Card className="mb-4 shadow-sm">
    <Row gutter={[16, 16]} align="middle">
      <Col flex="auto">
        <Input.Search
          placeholder="Search..."
          allowClear
          onSearch={onSearch}
          onChange={(e) => onSearch(e.target.value)}
          className="max-w-md"
        />
      </Col>
      <Col>
        <Space>
          {children}
          {/* <Button icon={<ExportOutlined />}>Export</Button>
            <Button icon={<ReloadOutlined />}>Refresh</Button> */}
        </Space>
      </Col>
    </Row>
  </Card>
);

const Users = () => {
  const [users, setUsers] = useState(initialData.users);
  const [branches] = useState(initialData.branches);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const { isVisible, editingRecord, showModal, hideModal } = useModal();
  const [form] = Form.useForm();

  const filteredUsers = useTableData(users, searchTerm, filters);

  const columns = [
    {
      title: "User Info",
      key: "userInfo",
      render: (_, record) => (
        <div>
          <div className="font-medium">
            {record.firstName} {record.lastName}
          </div>
          <div className="text-gray-500 text-sm">@{record.username}</div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const colors = {
          superAdmin: "red",
          admin: "orange",
          receptionist: "blue",
        };
        return <Tag color={colors[role]}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Branch",
      dataIndex: "branchId",
      key: "branchId",
      render: (branchId) => {
        if (!branchId) return <Tag>All Branches</Tag>;
        const branch = branches.find((b) => b.branchId === branchId);
        return branch ? branch.branchName : "Unknown";
      },
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div>
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span className="text-sm">{record.email}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Phone className="w-3 h-3" />
            <span className="text-sm text-gray-500">
              {record.contactNumber}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date) => (date ? formatDateTime(date) : "Never"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <StatusBadge status={isActive ? "Active" : "Inactive"} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <ActionButtons
          record={record}
          onEdit={showModal}
          onDelete={handleDeleteUser}
          showView
        />
      ),
    },
  ];

  const handleSubmitUser = (values) => {
    if (editingRecord) {
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === editingRecord.userId ? { ...u, ...values } : u
        )
      );
      message.success("User updated successfully");
    } else {
      const newUser = {
        ...values,
        userId: Date.now(),
        createdAt: new Date().toISOString(),
        password: "hashed_password", // In real app, hash the password
      };
      setUsers((prev) => [...prev, newUser]);
      message.success("User created successfully");
    }
    hideModal();
    form.resetFields();
  };

  const handleDeleteUser = (record) => {
    setUsers((prev) => prev.filter((u) => u.userId !== record.userId));
    message.success("User deleted successfully");
  };

  useEffect(() => {
    if (editingRecord) {
      form.setFieldsValue(editingRecord);
    } else {
      form.resetFields();
    }
  }, [editingRecord, form]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Title level={2} className="mb-0">
          User Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add User
        </Button>
      </div>

      <FilterBar onSearch={setSearchTerm}>
        <Select
          placeholder="Filter by Role"
          allowClear
          onChange={(value) => setFilters((prev) => ({ ...prev, role: value }))}
          className="w-40"
          options={Object.entries(USER_ROLES).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />
        <Select
          placeholder="Filter by Branch"
          allowClear
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, branchId: value }))
          }
          className="w-48"
        >
          {branches.map((branch) => (
            <Option key={branch.branchId} value={branch.branchId}>
              {branch.branchName}
            </Option>
          ))}
        </Select>
      </FilterBar>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="userId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} users`,
          }}
        />
      </Card>

      <Modal
        title={editingRecord ? "Edit User" : "Add New User"}
        open={isVisible}
        onCancel={hideModal}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitUser}
          className="mt-4"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please input username!" }]}
              >
                <Input placeholder="john_doe" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select role!" }]}
              >
                <Select placeholder="Select role">
                  <Option value="superAdmin">Super Admin</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="receptionist">Receptionist</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please input first name!" },
                ]}
              >
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please input last name!" }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input email!" },
                  { type: "email", message: "Please enter valid email!" },
                ]}
              >
                <Input placeholder="john.doe@hotel.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="contactNumber" label="Contact Number">
                <Input placeholder="+63 9123456789" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="branchId" label="Assigned Branch">
                <Select placeholder="Select branch (optional for super admin)">
                  {branches.map((branch) => (
                    <Option key={branch.branchId} value={branch.branchId}>
                      {branch.branchName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isActive" label="Status" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>

          {!editingRecord && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input password!" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          )}

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={hideModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600">
                {editingRecord ? "Update" : "Create"} User
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
