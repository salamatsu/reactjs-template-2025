import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Modal,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { useGetBookingsApi } from "../../../services/requests/useBookings";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const BookingsManagement = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Sample booking data
  // const bookingsData = [
  //   {
  //     bookingId: 43,
  //     bookingReference: "BK86506760405",
  //     branchId: 1,
  //     roomId: 1,
  //     roomTypeId: 1,
  //     rateId: 1,
  //     rateTypeId: 1,
  //     numberOfGuests: 2,
  //     checkInDateTime: "2025-08-30T20:41:46.741Z",
  //     expectedCheckOutDateTime: "2025-08-30T23:41:46.741Z",
  //     actualCheckInDateTime: null,
  //     actualCheckOutDateTime: null,
  //     stayDuration: 3,
  //     stayDurationType: "hours",
  //     bookingStatus: "confirmed",
  //     paymentStatus: "partial",
  //     baseAmount: 1350,
  //     discountAmount: 0,
  //     taxAmount: 162,
  //     totalAmount: 1450,
  //     currency: "PHP",
  //     paymentMethod: null,
  //     specialRequests: null,
  //     guestNotes: null,
  //     staffNotes: null,
  //     source: "walk-in",
  //     cancellationPolicy: null,
  //     createdAt: "2025-08-30 20:41:46",
  //     updatedAt: "2025-08-30 20:41:55",
  //     createdBy: "3",
  //     primaryGuestName: null,
  //     primaryGuestContact: null,
  //     primaryGuestEmail: null,
  //     plannedDuration: null,
  //     promoId: null,
  //     serviceChargesAmount: 0,
  //     totalPaid: 1350,
  //     balanceAmount: 100,
  //     actualDuration: null,
  //     cancellationReason: null,
  //     lastUpdatedBy: null,
  //     bookingDateTime: null,
  //     branchCode: "SOGO-EDSA-CUB",
  //     branchName: "Hotel Sogo EDSA Cubao",
  //     branchAddress: "1234 EDSA, Cubao, Quezon City",
  //     branchCity: "Quezon City",
  //     branchRegion: "Metro Manila",
  //     branchContact: "63-2-8123-4567",
  //     branchEmail: "cubao@hotelsogo.com",
  //     operatingHours: "24/7",
  //     branchAmenities:
  //       '["Free WiFi","24-hour Front Desk","Room Service","Cable TV","Air Conditioning"]',
  //     roomNumber: "101",
  //     floor: "1",
  //     roomStatus: "occupied",
  //     lastCleaned: "2024-08-07",
  //     maintenanceStatus: "good",
  //     roomNotes: null,
  //     roomTypeCode: "PREM",
  //     roomTypeName: "Premium Room",
  //     roomTypeDescription:
  //       "Comfortable and affordable room with essential amenities for budget-conscious travelers",
  //     bedConfiguration: "Queen Bed",
  //     maxOccupancy: 2,
  //     roomSize: "20",
  //     roomTypeAmenities:
  //       '["Free WiFi", "Air Conditioning", "LED TV", "Private Bathroom", "Complimentary Toiletries", "Cable Channels"]',
  //     roomTypeFeatures:
  //       '["12/24 Hour Rates", "Clean Linens", "Room Service Available", "Safe Environment", "Japanese Theme Decor"]',
  //     roomTypeImage:
  //       "https://www.hotelsogo.com/images/photos/1555053327_Premium.jpg",
  //     rateAmountPerHour: 450,
  //     rateCurrency: "PHP",
  //     rateEffectiveFrom: "2025-01-01",
  //     rateEffectiveTo: "2026-12-31",
  //     rateTypeCode: "3HR",
  //     rateTypeName: "3 Hour Rate",
  //     rateTypeDuration: 3,
  //     durationType: "HOUR",
  //     rateTypeDayType: "all",
  //     rateTypeDescription:
  //       "Short stay rate for 3 hours - perfect for rest and relaxation",
  //     createdByUsername: "receptionist",
  //     createdByFirstName: "receptionist",
  //     createdByLastName: "user",
  //     createdByRole: "receptionist",
  //     lastUpdatedByUsername: null,
  //     lastUpdatedByFirstName: null,
  //     lastUpdatedByLastName: null,
  //     lastUpdatedByRole: null,
  //     promotion: null,
  //     additionalCharges: [
  //       {
  //         chargeId: 77,
  //         bookingId: 43,
  //         serviceId: 1,
  //         chargeType: "room_service",
  //         itemDescription: null,
  //         quantity: 2,
  //         unitPrice: 50,
  //         totalAmount: 100,
  //         appliedAt: null,
  //         appliedBy: null,
  //         status: null,
  //         serviceName: "Extra Towels",
  //         serviceType: "AMENITY",
  //         serviceBasePrice: 50,
  //         isPerItem: 1,
  //         appliedByUsername: null,
  //         appliedByFirstName: null,
  //         appliedByLastName: null,
  //         approvedByUsername: null,
  //         approvedByFirstName: null,
  //         approvedByLastName: null,
  //       },
  //     ],
  //     payments: [
  //       {
  //         paymentId: 101,
  //         bookingId: 43,
  //         paymentType: "service_charge",
  //         paymentMethod: "cash",
  //         amount: 100,
  //         currency: "PHP",
  //         paymentDateTime: "2025-08-30 20:41:55",
  //         transactionReference: null,
  //         paymentStatus: "pending",
  //         processedBy: "3",
  //         notes: null,
  //         paymentCategory: "additional_service",
  //         processedAt: "2025-08-30T20:41:55.409Z",
  //         relatedChargeId: null,
  //         receiptNumber: null,
  //         processedByUsername: "receptionist",
  //         processedByFirstName: "receptionist",
  //         processedByLastName: "user",
  //         verifiedByUsername: "receptionist",
  //         verifiedByFirstName: "receptionist",
  //         verifiedByLastName: "user",
  //         relatedChargeDescription: null,
  //         parentTransactionReference: null,
  //       },
  //       {
  //         paymentId: 100,
  //         bookingId: 43,
  //         paymentType: "room_charge",
  //         paymentMethod: "cash",
  //         amount: 1350,
  //         currency: "PHP",
  //         paymentDateTime: "2025-08-30 20:41:46",
  //         transactionReference: null,
  //         paymentStatus: "completed",
  //         processedBy: "3",
  //         notes: null,
  //         paymentCategory: "booking",
  //         processedAt: "2025-08-30T20:41:46.763Z",
  //         relatedChargeId: null,
  //         receiptNumber: null,
  //         processedByUsername: "receptionist",
  //         processedByFirstName: "receptionist",
  //         processedByLastName: "user",
  //         verifiedByUsername: "receptionist",
  //         verifiedByFirstName: "receptionist",
  //         verifiedByLastName: "user",
  //         relatedChargeDescription: null,
  //         parentTransactionReference: null,
  //       },
  //     ],
  //     extensions: [],
  //     statusHistory: [],
  //   },
  // ];

  const { data: bookingsData } = useGetBookingsApi();

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "success",
      pending: "warning",
      cancelled: "error",
      completed: "default",
      occupied: "processing",
      available: "success",
      partial: "orange",
      paid: "green",
    };
    return colors[status] || "default";
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";
    return new Date(dateTime).toLocaleString();
  };

  const formatCurrency = (amount, currency = "PHP") => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const parseJsonArray = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  const showBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Booking Reference",
      dataIndex: "bookingReference",
      key: "bookingReference",
      render: (text) => (
        <Text strong style={{ color: "#1890ff" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branchName",
      key: "branchName",
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <Text type="secondary" className="text-sm">
            {record.branchCode}
          </Text>
        </div>
      ),
    },
    {
      title: "Room",
      key: "room",
      render: (_, record) => (
        <div>
          <div className="font-medium">Room {record.roomNumber}</div>
          <Text type="secondary" className="text-sm">
            {record.roomTypeName}
          </Text>
        </div>
      ),
    },
    {
      title: "Check-in",
      dataIndex: "checkInDateTime",
      key: "checkInDateTime",
      render: (text) => <div className="text-sm">{formatDateTime(text)}</div>,
    },
    {
      title: "Duration",
      key: "duration",
      render: (_, record) => (
        <Tag icon={<ClockCircleOutlined />} color="blue">
          {record.stayDuration} {record.stayDurationType}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tag color={getStatusColor(record.bookingStatus)}>
            {record.bookingStatus.toUpperCase()}
          </Tag>
          <Tag color={getStatusColor(record.paymentStatus)}>
            Payment: {record.paymentStatus}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Total Amount",
      key: "amount",
      render: (_, record) => (
        <div>
          <div className="font-bold text-lg">
            {formatCurrency(record.totalAmount)}
          </div>
          {record.balanceAmount > 0 && (
            <Text type="danger" className="text-sm">
              Balance: {formatCurrency(record.balanceAmount)}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => showBookingDetails(record)}
          >
            View Details
          </Button>
          <Button size="small">Edit</Button>
        </Space>
      ),
    },
  ];

  const renderBookingDetails = (booking) => {
    if (!booking) return null;

    const additionalChargesColumns = [
      {
        title: "Service",
        dataIndex: "serviceName",
        key: "serviceName",
      },
      {
        title: "Type",
        dataIndex: "serviceType",
        key: "serviceType",
        render: (text) => <Tag>{text}</Tag>,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        render: (amount) => formatCurrency(amount),
      },
      {
        title: "Total",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (amount) => <Text strong>{formatCurrency(amount)}</Text>,
      },
    ];

    const paymentsColumns = [
      {
        title: "Type",
        dataIndex: "paymentType",
        key: "paymentType",
        render: (text) => (
          <Tag color="blue">{text.replace("_", " ").toUpperCase()}</Tag>
        ),
      },
      {
        title: "Method",
        dataIndex: "paymentMethod",
        key: "paymentMethod",
        render: (text) => <Tag color="green">{text?.toUpperCase() || "-"}</Tag>,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount) => <Text strong>{formatCurrency(amount)}</Text>,
      },
      {
        title: "Status",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        render: (status) => (
          <Tag
            color={getStatusColor(status)}
            icon={
              status === "completed" ? (
                <CheckCircleOutlined />
              ) : (
                <ExclamationCircleOutlined />
              )
            }
          >
            {status.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Date",
        dataIndex: "paymentDateTime",
        key: "paymentDateTime",
        render: (date) => formatDateTime(date),
      },
    ];

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Booking Details" key="1">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                title={
                  <>
                    <HomeOutlined /> Branch Information
                  </>
                }
                size="small"
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Branch">
                    {booking.branchName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Code">
                    {booking.branchCode}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {booking.branchAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact">
                    <Space>
                      <PhoneOutlined />
                      {booking.branchContact}
                      <MailOutlined />
                      {booking.branchEmail}
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Hours">
                    {booking.operatingHours}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <>
                    <CalendarOutlined /> Booking Information
                  </>
                }
                size="small"
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Reference">
                    {booking.bookingReference}
                  </Descriptions.Item>
                  <Descriptions.Item label="Source">
                    {booking.source}
                  </Descriptions.Item>
                  <Descriptions.Item label="Guests">
                    {booking.numberOfGuests}
                  </Descriptions.Item>
                  <Descriptions.Item label="Check-in">
                    {formatDateTime(booking.checkInDateTime)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expected Check-out">
                    {formatDateTime(booking.expectedCheckOutDateTime)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Duration">
                    {booking.stayDuration} {booking.stayDurationType}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Room Details" size="small">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar size={64} src={booking.roomTypeImage} />
                  <div>
                    <Title level={5} className="mb-1">
                      Room {booking.roomNumber}
                    </Title>
                    <Text type="secondary">{booking.roomTypeName}</Text>
                    <div>
                      <Tag color={getStatusColor(booking.roomStatus)}>
                        {booking.roomStatus}
                      </Tag>
                    </div>
                  </div>
                </div>

                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Floor">
                    Floor {booking.floor}
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {booking.roomSize} sqm
                  </Descriptions.Item>
                  <Descriptions.Item label="Bed">
                    {booking.bedConfiguration}
                  </Descriptions.Item>
                  <Descriptions.Item label="Max Occupancy">
                    {booking.maxOccupancy} guests
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Cleaned">
                    {booking.lastCleaned}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <div>
                  <Text strong>Amenities:</Text>
                  <div className="mt-2">
                    {parseJsonArray(booking.roomTypeAmenities).map(
                      (amenity, index) => (
                        <Tag key={index} className="mb-1">
                          {amenity}
                        </Tag>
                      )
                    )}
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <>
                    <DollarOutlined /> Financial Summary
                  </>
                }
                size="small"
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Base Amount">
                    {formatCurrency(booking.baseAmount)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Discount">
                    {formatCurrency(booking.discountAmount)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax">
                    {formatCurrency(booking.taxAmount)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Service Charges">
                    {formatCurrency(booking.serviceChargesAmount)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Amount">
                    <Text strong className="text-lg">
                      {formatCurrency(booking.totalAmount)}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Paid">
                    {formatCurrency(booking.totalPaid)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Balance">
                    <Text
                      type={booking.balanceAmount > 0 ? "danger" : "success"}
                    >
                      {formatCurrency(booking.balanceAmount)}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Rate">
                    {booking.rateTypeName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rate Description">
                    {booking.rateTypeDescription}
                  </Descriptions.Item>
                  <Descriptions.Item label="Per Hour">
                    {formatCurrency(booking.rateAmountPerHour)}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Additional Charges" key="2">
          <Table
            columns={additionalChargesColumns}
            dataSource={booking.additionalCharges}
            rowKey="chargeId"
            size="small"
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Payments" key="3">
          <Table
            columns={paymentsColumns}
            dataSource={booking.payments}
            rowKey={(record, index) => `${record.paymentId}-${index}`}
            size="small"
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Staff Information" key="4">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Created By" size="small">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Username">
                    {booking.createdByUsername}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {booking.createdByFirstName} {booking.createdByLastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Role">
                    {booking.createdByRole}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created At">
                    {formatDateTime(booking.createdAt)}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Last Updated By" size="small">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Username">
                    {booking.lastUpdatedByUsername || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {booking.lastUpdatedByFirstName &&
                    booking.lastUpdatedByLastName
                      ? `${booking.lastUpdatedByFirstName} ${booking.lastUpdatedByLastName}`
                      : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Role">
                    {booking.lastUpdatedByRole || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Updated At">
                    {formatDateTime(booking.updatedAt)}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          Hotel Bookings
        </Title>
        <Paragraph type="secondary">
          Manage and view all hotel bookings across branches
        </Paragraph>
      </div>

      <Card>
        <div className="mb-4 flex justify-between items-center">
          <Space>
            <Badge count={bookingsData.length} showZero>
              <Button icon={<CalendarOutlined />}>Total Bookings</Button>
            </Badge>
          </Space>
          <Space>
            <Button type="primary">Add New Booking</Button>
            <Button icon={<SettingOutlined />}>Settings</Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={bookingsData}
          rowKey="bookingId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} bookings`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={
          <Space>
            <InfoCircleOutlined />
            Booking Details - {selectedBooking?.bookingReference}
          </Space>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={1200}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          <Button key="edit" type="primary">
            Edit Booking
          </Button>,
        ]}
      >
        {renderBookingDetails(selectedBooking)}
      </Modal>
    </div>
  );
};

export default BookingsManagement;
