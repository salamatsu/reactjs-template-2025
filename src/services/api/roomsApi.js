import { createAxiosInstanceWithInterceptor, getUsersValues } from "./axios";

const axiosDefault = createAxiosInstanceWithInterceptor(
  "data",
  getUsersValues.receptionist
);

// Enhanced error handler
const handleApiError = (error) => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  if (error.response?.status === 401) {
    throw new Error("Authentication required");
  }
  if (error.response?.status === 403) {
    throw new Error("Access denied");
  }
  if (error.response?.status === 404) {
    throw new Error("Resource not found");
  }
  throw new Error(error.message || "An unexpected error occurred");
};

// Get all rooms for a branch
export const getRoomsByBranchApi = async (branchId = null) => {
  try {
    const params = new URLSearchParams();
    if (branchId) params.append("branchId", branchId);

    const queryString = params.toString();
    const url = queryString ? `/api/rooms?${queryString}` : "/api/rooms";

    const result = await axiosDefault.get(url);
    return result.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
// Get room rates

export const getRoomRatesApi = async (roomTypeId = null, branchId = null) => {
  try {
    const params = new URLSearchParams();
    if (roomTypeId) params.append("roomTypeId", roomTypeId);
    if (branchId) params.append("branchId", branchId);

    const queryString = params.toString();
    const url = queryString
      ? `/api/rooms/roomRates?${queryString}`
      : "/api/rooms/roomRates";

    const result = await axiosDefault.get(url);
    return result.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get available rooms
export const getAvailableRoomsApi = async (
  checkIn,
  checkOut,
  branchId = null
) => {
  try {
    // Client-side validation
    if (!checkIn || !checkOut) {
      throw new Error("Check-in and check-out dates are required");
    }

    const params = new URLSearchParams();
    params.append("checkIn", checkIn);
    params.append("checkOut", checkOut);
    if (branchId) params.append("branchId", branchId);

    const queryString = params.toString();
    const url = `/api/rooms/available?${queryString}`;

    const result = await axiosDefault.get(url);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update room status
export const updateRoomStatusApi = async (roomId, payload) => {
  try {
    // Client-side validation
    if (!payload.status) {
      throw new Error("Room status is required");
    }

    const result = await axiosDefault.patch(
      `/api/rooms/${roomId}/status`,
      payload
    );
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};
