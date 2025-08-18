import { Bed, CheckCircle, MapPin, Star, Users } from "lucide-react";
import StatusTag from "../../../../components/features/StatusTag";
import { memo } from "react";
import { ROOM_STATUSES } from "../../../../lib/constants";

const RoomCard = memo(({ room, isSelected, onSelect }) => {
  const isAvailable = room.roomStatus === ROOM_STATUSES.AVAILABLE;

  return (
    <div
      className={`min-w-[280px] bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 transform ${
        isSelected
          ? "border-red-400 ring-4 ring-red-100 shadow-xl scale-105"
          : "border-gray-100 hover:border-red-300"
      } ${!isAvailable ? "opacity-75" : ""}`}
      onClick={() => onSelect(room)}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <div
          className="h-32 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
          style={{
            backgroundImage: `url(${room.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <Bed className="w-12 h-12 text-blue-400" /> */}
        </div>
        <div className="absolute top-3 right-3">
          <StatusTag status={room.roomStatus} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Room {room.roomNumber}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            {/* <Star className="w-4 h-4" /> */}
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-semibold text-gray-900 text-lg">
              {room.roomTypeName}
            </p>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Bed className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">{room.bedConfiguration}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium">
              Max {room.maxOccupancy} guests
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium">{room.roomSize} sqm</span>
          </div>
        </div>

        {isSelected && (
          <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-700">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Selected for booking
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default RoomCard;
