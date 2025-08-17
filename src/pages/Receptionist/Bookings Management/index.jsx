import {
  ExportOutlined,
  HomeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DollarSign, Mail, Phone, ServerIcon, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Timeline,
  Typography,
} from "antd";
import ActionButtons from "../../../components/ui/buttons/ActionButtons";

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

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const showModal = (record = null) => {
    setEditingRecord(record);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setEditingRecord(null);
  };

  return {
    isVisible,
    editingRecord,
    showModal,
    hideModal,
  };
};

const formatDateTime = (dateString) => {
  return dayjs(dateString).format("MMM DD, YYYY HH:mm");
};
const parseJsonField = (jsonString) => {
  try {
    return JSON.parse(jsonString || "[]");
  } catch {
    return [];
  }
};

const BookingsManagement = () => {
  // Mock booking data - in real app, this would come from your API
  const [bookings, setBookings] = useState([
    {
      bookingId: 1,
      bookingNumber: "BK240815001",
      guestName: "Juan Dela Cruz",
      guestEmail: "juan.delacruz@email.com",
      guestPhone: "+63 9123456789",
      branchId: 1,
      roomId: 1,
      roomNumber: "101",
      roomTypeId: 1,
      rateId: 1,
      checkInDate: "2024-08-17T14:00:00Z",
      checkOutDate: "2024-08-17T17:00:00Z",
      bookingStatus: "confirmed",
      paymentStatus: "paid",
      totalAmount: 1500.0,
      discountAmount: 300.0,
      finalAmount: 1200.0,
      currency: "PHP",
      promoCode: "WELCOME20",
      additionalServices: JSON.stringify([
        { serviceId: 1, quantity: 1, amount: 500 },
      ]),
      specialRequests: "Late check-in requested",
      numberOfGuests: 2,
      bookingSource: "online",
      createdAt: "2024-08-15T10:30:00Z",
      updatedAt: "2024-08-15T10:30:00Z",
      checkedInAt: null,
      checkedOutAt: null,
      cancelledAt: null,
      cancellationReason: null,
    },
    {
      bookingId: 2,
      bookingNumber: "BK240815002",
      guestName: "Maria Santos",
      guestEmail: "maria.santos@email.com",
      guestPhone: "+63 9987654321",
      branchId: 1,
      roomId: 1,
      roomNumber: "102",
      roomTypeId: 1,
      rateId: 1,
      checkInDate: "2024-08-16T12:00:00Z",
      checkOutDate: "2024-08-16T18:00:00Z",
      bookingStatus: "checked_in",
      paymentStatus: "paid",
      totalAmount: 1500.0,
      discountAmount: 0.0,
      finalAmount: 1500.0,
      currency: "PHP",
      promoCode: null,
      additionalServices: JSON.stringify([]),
      specialRequests: "",
      numberOfGuests: 1,
      bookingSource: "walk_in",
      createdAt: "2024-08-15T14:20:00Z",
      updatedAt: "2024-08-16T12:05:00Z",
      checkedInAt: "2024-08-16T12:05:00Z",
      checkedOutAt: null,
      cancelledAt: null,
      cancellationReason: null,
    },
    {
      bookingId: 3,
      bookingNumber: "BK240815003",
      guestName: "Robert Johnson",
      guestEmail: "robert.j@email.com",
      guestPhone: "+63 9111222333",
      branchId: 1,
      roomId: 1,
      roomNumber: "103",
      roomTypeId: 1,
      rateId: 1,
      checkInDate: "2024-08-14T15:00:00Z",
      checkOutDate: "2024-08-14T21:00:00Z",
      bookingStatus: "completed",
      paymentStatus: "paid",
      totalAmount: 1500.0,
      discountAmount: 0.0,
      finalAmount: 1500.0,
      currency: "PHP",
      promoCode: null,
      additionalServices: JSON.stringify([
        { serviceId: 1, quantity: 2, amount: 1000 },
      ]),
      specialRequests: "Extra towels",
      numberOfGuests: 3,
      bookingSource: "phone",
      createdAt: "2024-08-14T13:00:00Z",
      updatedAt: "2024-08-14T21:15:00Z",
      checkedInAt: "2024-08-14T15:10:00Z",
      checkedOutAt: "2024-08-14T21:15:00Z",
      cancelledAt: null,
      cancellationReason: null,
    },
    {
      bookingId: 4,
      bookingNumber: "BK240815004",
      guestName: "Anna Garcia",
      guestEmail: "anna.garcia@email.com",
      guestPhone: "+63 9444555666",
      branchId: 1,
      roomId: 1,
      roomNumber: "104",
      roomTypeId: 1,
      rateId: 1,
      checkInDate: "2024-08-18T10:00:00Z",
      checkOutDate: "2024-08-18T16:00:00Z",
      bookingStatus: "cancelled",
      paymentStatus: "refunded",
      totalAmount: 1500.0,
      discountAmount: 0.0,
      finalAmount: 1500.0,
      currency: "PHP",
      promoCode: null,
      additionalServices: JSON.stringify([]),
      specialRequests: "",
      numberOfGuests: 2,
      bookingSource: "online",
      createdAt: "2024-08-15T16:45:00Z",
      updatedAt: "2024-08-16T09:30:00Z",
      checkedInAt: null,
      checkedOutAt: null,
      cancelledAt: "2024-08-16T09:30:00Z",
      cancellationReason: "Change in plans",
    },
  ]);

  const [branches] = useState(initialData.branches);
  const [roomTypes] = useState(initialData.roomTypes);
  const [additionalServices] = useState(initialData.additionalServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState([]);
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState("all"); // all, today, upcoming, history
  const { isVisible, editingRecord, showModal, hideModal } = useModal();

  // Enhanced filtering logic
  const filteredBookings = useMemo(() => {
    let filteredData = [...bookings];

    // Text search
    if (searchTerm) {
      filteredData = filteredData.filter((booking) =>
        Object.values(booking).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Date range filter
    if (dateFilter && dateFilter.length === 2) {
      const [startDate, endDate] = dateFilter;
      filteredData = filteredData.filter((booking) => {
        const checkInDate = dayjs(booking.checkInDate);
        return (
          checkInDate.isAfter(startDate.startOf("day").subtract(1, "day")) &&
          checkInDate.isBefore(endDate.endOf("day").add(1, "day"))
        );
      });
    }

    // View mode filter
    const today = dayjs();
    switch (viewMode) {
      case "today":
        filteredData = filteredData.filter((booking) => {
          const checkInDate = dayjs(booking.checkInDate);
          return checkInDate.isSame(today, "day");
        });
        break;
      case "upcoming":
        filteredData = filteredData.filter((booking) => {
          const checkInDate = dayjs(booking.checkInDate);
          return (
            checkInDate.isAfter(today, "day") &&
            ["confirmed", "pending"].includes(booking.bookingStatus)
          );
        });
        break;
      case "history":
        filteredData = filteredData.filter((booking) => {
          return ["completed", "cancelled", "no_show"].includes(
            booking.bookingStatus
          );
        });
        break;
      default:
        // all - no additional filtering
        break;
    }

    // Other filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined && filters[key] !== "") {
        filteredData = filteredData.filter(
          (item) => item[key] === filters[key]
        );
      }
    });

    return filteredData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [bookings, searchTerm, dateFilter, viewMode, filters]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "orange",
      confirmed: "blue",
      checked_in: "green",
      completed: "purple",
      cancelled: "red",
      no_show: "volcano",
    };
    return colors[status] || "default";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: "orange",
      paid: "green",
      partial: "blue",
      refunded: "purple",
      failed: "red",
    };
    return colors[status] || "default";
  };

  const getBookingSourceIcon = (source) => {
    const icons = {
      online: <ServerIcon className="w-4 h-4" />,
      phone: <Phone className="w-4 h-4" />,
      walk_in: <Users className="w-4 h-4" />,
      app: <ServerIcon className="w-4 h-4" />,
    };
    return icons[source] || <SettingOutlined />;
  };

  const columns = [
    {
      title: "Booking Details",
      key: "bookingDetails",
      width: 200,
      render: (_, record) => (
        <div>
          <div className="font-bold text-blue-600">{record.bookingNumber}</div>
          <div className="font-medium">{record.guestName}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            {getBookingSourceIcon(record.bookingSource)}
            <span>{record.bookingSource.replace("_", " ")}</span>
          </div>
          <div className="text-xs text-gray-500">
            {record.numberOfGuests} guest(s)
          </div>
        </div>
      ),
    },
    {
      title: "Contact Info",
      key: "contactInfo",
      width: 180,
      render: (_, record) => (
        <div>
          <div className="flex items-center gap-1 text-sm">
            <Mail className="w-3 h-3" />
            <span className="truncate">{record.guestEmail}</span>
          </div>
          <div className="flex items-center gap-1 text-sm mt-1">
            <Phone className="w-3 h-3" />
            <span>{record.guestPhone}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Room & Dates",
      key: "roomDates",
      width: 200,
      render: (_, record) => {
        const checkIn = dayjs(record.checkInDate);
        const checkOut = dayjs(record.checkOutDate);
        const duration = checkOut.diff(checkIn, "hours");

        return (
          <div>
            <div className="font-medium">Room {record.roomNumber}</div>
            <div className="text-sm text-gray-600">
              {
                roomTypes.find((rt) => rt.roomTypeId === record.roomTypeId)
                  ?.roomTypeName
              }
            </div>
            <div className="text-xs text-gray-500 mt-1">
              <div>In: {checkIn.format("MMM DD, HH:mm")}</div>
              <div>Out: {checkOut.format("MMM DD, HH:mm")}</div>
              <div className="text-blue-600">{duration}h stay</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Amount",
      key: "amount",
      width: 120,
      render: (_, record) => {
        const additionalServices = parseJsonField(record.additionalServices);
        const servicesTotal = additionalServices.reduce(
          (sum, service) => sum + (service.amount || 0),
          0
        );

        return (
          <div>
            <div className="font-bold text-green-600">
              {formatCurrency(record.finalAmount)}
            </div>
            {record.discountAmount > 0 && (
              <div className="text-xs text-red-500">
                -{formatCurrency(record.discountAmount)}
              </div>
            )}
            {servicesTotal > 0 && (
              <div className="text-xs text-blue-500">
                +{formatCurrency(servicesTotal)} services
              </div>
            )}
            {record.promoCode && (
              <Tag size="small" color="green">
                {record.promoCode}
              </Tag>
            )}
          </div>
        );
      },
      sorter: (a, b) => a.finalAmount - b.finalAmount,
    },
    {
      title: "Status",
      key: "status",
      width: 140,
      render: (_, record) => (
        <div className="space-y-1">
          <Tag color={getStatusColor(record.bookingStatus)}>
            {record.bookingStatus.replace("_", " ").toUpperCase()}
          </Tag>
          <Tag color={getPaymentStatusColor(record.paymentStatus)} size="small">
            {record.paymentStatus.toUpperCase()}
          </Tag>
          {record.checkedInAt && (
            <div className="text-xs text-green-600">
              In: {formatDateTime(record.checkedInAt)}
            </div>
          )}
          {record.checkedOutAt && (
            <div className="text-xs text-purple-600">
              Out: {formatDateTime(record.checkedOutAt)}
            </div>
          )}
        </div>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Confirmed", value: "confirmed" },
        { text: "Checked In", value: "checked_in" },
        { text: "Completed", value: "completed" },
        { text: "Cancelled", value: "cancelled" },
        { text: "No Show", value: "no_show" },
      ],
      onFilter: (value, record) => record.bookingStatus === value,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => <div className="text-xs">{formatDateTime(date)}</div>,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <ActionButtons
          record={record}
          onEdit={showModal}
          onDelete={handleCancelBooking}
          showView
          onView={handleViewBooking}
        />
      ),
    },
  ];

  const handleViewBooking = (record) => {
    Modal.info({
      title: `Booking Details - ${record.bookingNumber}`,
      width: 700,
      content: (
        <div className="space-y-4 mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <div className="space-y-2">
                <div>
                  <strong>Guest:</strong> {record.guestName}
                </div>
                <div>
                  <strong>Email:</strong> {record.guestEmail}
                </div>
                <div>
                  <strong>Phone:</strong> {record.guestPhone}
                </div>
                <div>
                  <strong>Guests:</strong> {record.numberOfGuests}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="space-y-2">
                <div>
                  <strong>Room:</strong> {record.roomNumber}
                </div>
                <div>
                  <strong>Check-in:</strong>{" "}
                  {formatDateTime(record.checkInDate)}
                </div>
                <div>
                  <strong>Check-out:</strong>{" "}
                  {formatDateTime(record.checkOutDate)}
                </div>
                <div>
                  <strong>Source:</strong> {record.bookingSource}
                </div>
              </div>
            </Col>
          </Row>

          <div>
            <strong>Payment Summary:</strong>
            <div className="bg-gray-50 p-3 rounded mt-2">
              <div className="flex justify-between">
                <span>Base Amount:</span>
                <span>{formatCurrency(record.totalAmount)}</span>
              </div>
              {record.discountAmount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Discount:</span>
                  <span>-{formatCurrency(record.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Final Amount:</span>
                <span>{formatCurrency(record.finalAmount)}</span>
              </div>
            </div>
          </div>

          {record.specialRequests && (
            <div>
              <strong>Special Requests:</strong>
              <div className="bg-blue-50 p-3 rounded mt-2">
                {record.specialRequests}
              </div>
            </div>
          )}

          {record.cancellationReason && (
            <div>
              <strong>Cancellation Reason:</strong>
              <div className="bg-red-50 p-3 rounded mt-2">
                {record.cancellationReason}
              </div>
            </div>
          )}
        </div>
      ),
    });
  };

  const handleCancelBooking = (record) => {
    if (record.bookingStatus === "cancelled") {
      message.warning("This booking is already cancelled");
      return;
    }

    Modal.confirm({
      title: "Cancel Booking",
      content: "Are you sure you want to cancel this booking?",
      onOk() {
        setBookings((prev) =>
          prev.map((b) =>
            b.bookingId === record.bookingId
              ? {
                  ...b,
                  bookingStatus: "cancelled",
                  paymentStatus: "refunded",
                  cancelledAt: new Date().toISOString(),
                  cancellationReason: "Cancelled by admin",
                  updatedAt: new Date().toISOString(),
                }
              : b
          )
        );
        message.success("Booking cancelled successfully");
      },
    });
  };

  const handleCheckIn = (record) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === record.bookingId
          ? {
              ...b,
              bookingStatus: "checked_in",
              checkedInAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    );
    message.success("Guest checked in successfully");
  };

  const handleCheckOut = (record) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === record.bookingId
          ? {
              ...b,
              bookingStatus: "completed",
              checkedOutAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : b
      )
    );
    message.success("Guest checked out successfully");
  };

  // Summary statistics
  const stats = {
    total: bookings.length,
    today: bookings.filter((b) => dayjs(b.checkInDate).isSame(dayjs(), "day"))
      .length,
    upcoming: bookings.filter((b) =>
      dayjs(b.checkInDate).isAfter(dayjs(), "day")
    ).length,
    revenue: bookings
      .filter((b) => ["completed", "checked_in"].includes(b.bookingStatus))
      .reduce((sum, b) => sum + b.finalAmount, 0),
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Typography.Title level={2} className="mb-0">
          Bookings Management
        </Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          New Booking
        </Button>
      </div>

      {/* Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card
            className={`text-center shadow-sm cursor-pointer transition-all ${
              viewMode === "all"
                ? "border-blue-500 bg-blue-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setViewMode("all")}
          >
            <Statistic
              title="Total Bookings"
              value={stats.total}
              prefix={<HomeOutlined className="text-blue-600" />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            className={`text-center shadow-sm cursor-pointer transition-all ${
              viewMode === "today"
                ? "border-green-500 bg-green-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setViewMode("today")}
          >
            <Statistic
              title="Today's Bookings"
              value={stats.today}
              prefix={<HomeOutlined className="text-green-600" />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            className={`text-center shadow-sm cursor-pointer transition-all ${
              viewMode === "upcoming"
                ? "border-orange-500 bg-orange-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setViewMode("upcoming")}
          >
            <Statistic
              title="Upcoming"
              value={stats.upcoming}
              prefix={<HomeOutlined className="text-orange-600" />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            className={`text-center shadow-sm cursor-pointer transition-all ${
              viewMode === "history"
                ? "border-purple-500 bg-purple-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setViewMode("history")}
          >
            <Statistic
              title="Revenue"
              value={stats.revenue}
              prefix={<DollarSign className="w-5 h-5 text-purple-600" />}
              formatter={(value) => formatCurrency(value)}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Advanced Filters */}
      <Card className="shadow-sm">
        <Row gutter={[16, 16]} align="middle">
          <Col flex="auto">
            <Input.Search
              placeholder="Search by booking number, guest name, email, or phone..."
              allowClear
              onSearch={setSearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </Col>
          <Col>
            <Space wrap>
              <DatePicker.RangePicker
                placeholder={["Start Date", "End Date"]}
                onChange={setDateFilter}
                className="w-64"
              />
              <Select
                placeholder="Branch"
                allowClear
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, branchId: value }))
                }
                className="w-40"
              >
                {branches.map((branch) => (
                  <Select.Option key={branch.branchId} value={branch.branchId}>
                    {branch.branchName}
                  </Select.Option>
                ))}
              </Select>
              <Select
                placeholder="Status"
                allowClear
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, bookingStatus: value }))
                }
                className="w-32"
              >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="confirmed">Confirmed</Select.Option>
                <Select.Option value="checked_in">Checked In</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </Select>
              <Button icon={<ExportOutlined />}>Export</Button>
              <Button icon={<ReloadOutlined />}>Refresh</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card className="shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Typography.Text strong>View: </Typography.Text>
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              size="small"
            >
              <Radio.Button value="all">All Bookings</Radio.Button>
              <Radio.Button value="today">Today</Radio.Button>
              <Radio.Button value="upcoming">Upcoming</Radio.Button>
              <Radio.Button value="history">History</Radio.Button>
            </Radio.Group>
          </div>
          <Typography.Text type="secondary">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </Typography.Text>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="bookingId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} bookings`,
          }}
          scroll={{ x: 1400 }}
          expandable={{
            expandedRowRender: (record) => {
              const additionalServices = parseJsonField(
                record.additionalServices
              );
              return (
                <div className="bg-gray-50 p-4 rounded">
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <div>
                        <Typography.Text strong>Timeline:</Typography.Text>
                        <Timeline size="small" className="mt-2">
                          <Timeline.Item color="blue">
                            Created: {formatDateTime(record.createdAt)}
                          </Timeline.Item>
                          {record.checkedInAt && (
                            <Timeline.Item color="green">
                              Checked In: {formatDateTime(record.checkedInAt)}
                            </Timeline.Item>
                          )}
                          {record.checkedOutAt && (
                            <Timeline.Item color="purple">
                              Checked Out: {formatDateTime(record.checkedOutAt)}
                            </Timeline.Item>
                          )}
                          {record.cancelledAt && (
                            <Timeline.Item color="red">
                              Cancelled: {formatDateTime(record.cancelledAt)}
                            </Timeline.Item>
                          )}
                        </Timeline>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        <Typography.Text strong>
                          Additional Services:
                        </Typography.Text>
                        {additionalServices.length > 0 ? (
                          <div className="mt-2 space-y-1">
                            {additionalServices.map((service, idx) => {
                              const serviceInfo = additionalServices.find(
                                (s) => s.serviceId === service.serviceId
                              );
                              return (
                                <div key={idx} className="text-sm">
                                  Service {service.serviceId} x
                                  {service.quantity} -{" "}
                                  {formatCurrency(service.amount)}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <Typography.Text
                            type="secondary"
                            className="mt-2 block"
                          >
                            No additional services
                          </Typography.Text>
                        )}
                      </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        <Typography.Text strong>Quick Actions:</Typography.Text>
                        <div className="mt-2 space-x-2">
                          {record.bookingStatus === "confirmed" && (
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleCheckIn(record)}
                            >
                              Check In
                            </Button>
                          )}
                          {record.bookingStatus === "checked_in" && (
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleCheckOut(record)}
                            >
                              Check Out
                            </Button>
                          )}
                          <Button
                            size="small"
                            onClick={() => handleViewBooking(record)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            },
          }}
        />
      </Card>

      <Modal
        title="New Booking"
        open={isVisible}
        onCancel={hideModal}
        footer={null}
        width={800}
      >
        <div className="text-center py-8">
          <Typography.Text className="text-gray-500">
            Booking creation form would be implemented here. This would include
            guest information, room selection, dates, rates, and payment
            details.
          </Typography.Text>
        </div>
      </Modal>
    </div>
  );
};

export default BookingsManagement;
