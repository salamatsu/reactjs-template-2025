import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  InputNumber,
  notification,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import {
  AlertCircle,
  Bed,
  CheckCircle,
  Clock,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  useGetRoomsByBranch,
  useGetRoomsRates,
} from "../../../services/requests/useRooms";
const { Title, Text, Paragraph } = Typography;

// Constants moved to separate file in real app
const ROOM_STATUSES = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  CLEANING: "cleaning",
  MAINTENANCE: "maintenance",
};

const STATUS_CONFIGS = {
  [ROOM_STATUSES.AVAILABLE]: {
    color: "green",
    icon: <CheckCircle className="w-4 h-4" />,
    label: "Available",
  },
  [ROOM_STATUSES.OCCUPIED]: {
    color: "red",
    icon: <XCircle className="w-4 h-4" />,
    label: "Occupied",
  },
  [ROOM_STATUSES.CLEANING]: {
    color: "yellow",
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Cleaning",
  },
  [ROOM_STATUSES.MAINTENANCE]: {
    color: "gray",
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Maintenance",
  },
};

const DAY_TYPE_OPTIONS = [
  { value: "weekday", label: "Weekday" },
  { value: "weekend", label: "Weekend" },
];
// Memoized Components
const StatusTag = memo(({ status }) => {
  const config = STATUS_CONFIGS[status];
  return (
    <Tag color={config.color} className="flex items-center gap-1 p-4">
      {config.label}
    </Tag>
  );
});

const RoomCard = memo(({ room, isSelected, onSelect }) => {
  const isAvailable = room.roomStatus === ROOM_STATUSES.AVAILABLE;
  const handleClick = useCallback(() => {
    // if (isAvailable) onSelect(room);
    onSelect(room);
  }, [isAvailable, onSelect, room]);

  return (
    <Card
      hoverable={isAvailable}
      className={`h-full transition-all cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500" : ""
      } ${!isAvailable ? "opacity-75 cursor-not-allowed" : ""}`}
      onClick={handleClick}
      styles={{ body: { padding: "16px" } }}
    >
      <div className="flex items-center justify-between mb-3">
        <Text strong className="text-lg">
          Room {room.roomNumber}
        </Text>
        <StatusTag status={room.roomStatus} />
      </div>

      <div className="space-y-2">
        <Text strong className="block">
          {room.roomTypeName}
        </Text>
        <div className="flex items-center gap-2 text-gray-600">
          <Bed className="w-4 h-4" />
          <Text type="secondary">{room.bedConfiguration}</Text>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <Text type="secondary">Max {room.maxOccupancy} guests</Text>
        </div>
        <Text type="secondary">{room.roomSize}</Text>
      </div>

      {room.notes && (
        <Alert
          message={room.notes}
          type="warning"
          size="small"
          className="mt-3"
        />
      )}
    </Card>
  );
});

const RateCard = memo(({ rate }) => (
  <Card className="bg-blue-50 border-blue-200">
    <Row justify="space-between" align="middle">
      <Col>
        <Text strong>{rate.rateTypeName}</Text>
      </Col>
      <Col>
        <Title level={3} className="text-blue-600 mb-0">
          ₱{rate.rate?.toLocaleString() || rate.baseRate?.toLocaleString()}
        </Title>
      </Col>
    </Row>
  </Card>
));

const RoomGrid = memo(({ groupedRooms, selectedRoom, onRoomSelect }) => (
  <>
    {Object.keys(groupedRooms).length === 0 ? (
      <div className="text-center py-8">
        <Text type="secondary">No rooms match your current filters</Text>
      </div>
    ) : (
      Object.keys(groupedRooms)
        .sort()
        .map((floor) => (
          <div key={floor} className="mb-6">
            <Title level={4} className="mb-3">
              Floor {floor}
              <Text type="secondary" className="ml-2 text-base font-normal">
                ({groupedRooms[floor].length} rooms)
              </Text>
            </Title>
            <Row gutter={[16, 16]}>
              {groupedRooms[floor].map((room) => (
                <Col xs={24} sm={12} lg={8} key={room.roomId}>
                  <RoomCard
                    room={room}
                    isSelected={selectedRoom?.roomId === room.roomId}
                    onSelect={onRoomSelect}
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))
    )}
  </>
));

const BookingForm = memo(
  ({
    selectedRoom,
    bookingDetails,
    rates,
    rateTypes,
    availableDurations,
    onBookingChange,
    onBook,
  }) => {
    const getRoomsRates = useGetRoomsRates(
      selectedRoom.roomTypeId,
      selectedRoom.branchId
    );

    return (
      <Card>
        <Title level={4} className="mb-4">
          Book Room {selectedRoom.roomNumber}
        </Title>

        <div className="mb-4">
          <Image
            src={selectedRoom?.imageUrl}
            alt={selectedRoom?.roomTypeName}
            className="w-full h-32 object-cover rounded-lg mb-3"
            preview={false}
          />
          <Title level={5}>{selectedRoom?.roomTypeName}</Title>
          <Paragraph type="secondary" className="text-sm">
            {selectedRoom?.description}
          </Paragraph>
        </div>

        <Space direction="vertical" size="large" className="w-full">
          <div>
            <div className="mb-2">
              <Text strong>
                <User className="w-4 h-4 inline mr-1" />
                Number of Guests
              </Text>
            </div>
            <InputNumber
              min={1}
              max={selectedRoom?.maxOccupancy || 2}
              value={bookingDetails.guests}
              onChange={(value) => onBookingChange("guests", value)}
              size="large"
            />
          </div>

          {/* Available Rates */}
          {/* add select rate */}
          {getRoomsRates.data.map((rate) => (
            <RateCard key={rate.rateTypeId} rate={rate} />
          ))}

          <Button
            type="primary"
            size="large"
            onClick={onBook} // add modal to calculate bill ex. 3 hrs , can also apply pro
            className="w-full"
            disabled={getRoomsRates.data.length === 0}
          >
            Book Room
          </Button>
        </Space>
      </Card>
    );
  }
);

// Custom hooks
const useFilters = () => {
  const [filters, setFilters] = useState({
    floor: "all",
    roomType: "all",
    status: "all",
  });

  const updateFilter = useCallback((filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  }, []);

  return [filters, updateFilter];
};

const useBooking = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    duration: "12",
    dayType: dayjs().day() === 0 || dayjs().day() === 6 ? "weekend" : "weekday", // is weekday using dayjs
    guests: 2,
  });

  const updateBookingDetails = useCallback((field, value) => {
    setBookingDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetBooking = useCallback(() => {
    setSelectedRoom(null);
    setBookingDetails({
      duration: "12",
      dayType: "weekday",
      guests: 1,
    });
  }, []);

  return {
    selectedRoom,
    setSelectedRoom,
    bookingDetails,
    updateBookingDetails,
    resetBooking,
  };
};

// Main Component
const RoomBooking = () => {
  // Hooks
  const [filters, updateFilter] = useFilters();
  const {
    selectedRoom,
    setSelectedRoom,
    bookingDetails,
    updateBookingDetails,
    resetBooking,
  } = useBooking();

  const getRoomsByBranch = useGetRoomsByBranch(1);

  const roomTypes = getRoomsByBranch.data.reduce(
    (acc, { roomTypeName, roomTypeId }) => {
      if (!acc.find((item) => item.roomTypeId === roomTypeId)) {
        acc.push({ roomTypeName, roomTypeId });
      }
      return acc;
    },
    []
  );

  const filteredRooms = useMemo(
    () =>
      getRoomsByBranch.data
        .filter(
          (room) => filters.floor === "all" || room.floor === filters.floor
        )
        .filter(
          (room) =>
            filters.roomType === "all" ||
            room.roomTypeId === parseInt(filters.roomType)
        )
        .filter(
          (room) =>
            filters.status === "all" || room.roomStatus === filters.status
        )
        .sort((a, b) => a.roomNumber.localeCompare(b.roomNumber)),
    [getRoomsByBranch.data, filters]
  );

  const groupedRooms = useMemo(
    () =>
      filteredRooms.reduce((acc, room) => {
        if (!acc[room.floor]) acc[room.floor] = [];
        acc[room.floor].push(room);
        return acc;
      }, {}),
    [filteredRooms]
  );

  const availableFloors = useMemo(
    () => [...new Set(getRoomsByBranch.data.map((room) => room.floor))].sort(),
    [getRoomsByBranch.data]
  );

  const handleRoomSelect = useCallback(
    (room) => {
      if (room.roomStatus === ROOM_STATUSES.AVAILABLE) {
        setSelectedRoom(room);
      }

      if (room.roomStatus === ROOM_STATUSES.MAINTENANCE) {
        notification.error({
          message: "Maintenance Error",
          description: "Room is currently under maintenance.",
        });
      }

      if (room.roomStatus === ROOM_STATUSES.CLEANING) {
        notification.error({
          message: "Cleaning Error",
          description: "Room is currently under cleaning.",
        });
      }

      if (room.roomStatus === ROOM_STATUSES.OCCUPIED) {
        notification.error({
          message: "Occupied Error",
          description: "Room is currently occupied.",
        });
      }

      if (room.roomStatus === ROOM_STATUSES.RESERVED) {
        notification.error({
          message: "Reserved Error",
          description: "Room is currently reserved.",
        });
      }
    },
    [setSelectedRoom]
  );

  const handleBookRoom = useCallback(() => {}, [
    selectedRoom,
    bookingDetails,
    resetBooking,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-3 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex flex-1 flex-col gap-3">
        {/* Filters */}
        <Card>
          <div className=" flex flex-row gap-3">
            <div className=" flex flex-row gap-1 items-center grow">
              <nobr>
                <Text strong>Floor</Text>
              </nobr>
              <Select
                value={filters.floor}
                onChange={(value) => updateFilter("floor", value)}
                className="w-full"
                options={[
                  { value: "all", label: "All Floors" },
                  ...availableFloors.map((floor) => ({
                    value: floor,
                    label: `${floor}st Floor`,
                  })),
                ]}
              />
            </div>
            <div className=" flex flex-row gap-1 items-center grow">
              <nobr>
                <Text strong>Room Type</Text>
              </nobr>
              <Select
                value={filters.roomType}
                onChange={(value) => updateFilter("roomType", value)}
                className="w-full"
                loading={getRoomsByBranch.isPending}
                options={[
                  { value: "all", label: "All Room Types" },
                  ...roomTypes.map(({ roomTypeName, roomTypeId }) => ({
                    value: roomTypeId,
                    label: roomTypeName,
                  })),
                ]}
              />
            </div>
            <div className=" flex flex-row gap-1 items-center grow">
              <nobr>
                <Text strong>Status</Text>
              </nobr>
              <Select
                value={filters.status}
                onChange={(value) => updateFilter("status", value)}
                className="w-full"
                options={[
                  { value: "all", label: "All Status" },
                  ...Object.entries(STATUS_CONFIGS).map(([status, config]) => ({
                    value: status,
                    label: config.label,
                  })),
                ]}
              />
            </div>
          </div>
        </Card>

        <div className=" grid grid-cols-12 gap-3 flex-1 h-full ">
          <div className=" col-span-8 flex flex-col overflow-auto">
            <Card>
              <RoomGrid
                groupedRooms={groupedRooms}
                selectedRoom={selectedRoom}
                onRoomSelect={handleRoomSelect}
              />
            </Card>
          </div>

          {/* Booking Panel */}
          <div className=" col-span-4 ">
            <div className="space-y-6 flex flex-col gap-3">
              {/* Legend */}
              <Card>
                <Title level={4} className="mb-3">
                  Room Status Legend
                </Title>
                <Space size="small">
                  {Object.entries(STATUS_CONFIGS).map(([status, config]) => (
                    <Tag key={status} color={config.color}>
                      {config.label}
                    </Tag>
                  ))}
                </Space>
              </Card>

              {/* Booking Form */}
              {selectedRoom ? (
                <BookingForm
                  selectedRoom={selectedRoom}
                  bookingDetails={bookingDetails}
                  onBookingChange={updateBookingDetails}
                  onBook={handleBookRoom}
                />
              ) : (
                <Card className="text-center py-8">
                  <Bed className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <Text type="secondary">
                    Select an available room to start booking
                  </Text>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;
