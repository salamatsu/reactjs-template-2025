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

// Get walk-in queue
export const getWalkInQueueApi = async (branchId = null) => {
  try {
    const params = new URLSearchParams();
    if (branchId) params.append("branchId", branchId);

    const queryString = params.toString();
    const url = queryString ? `/api/queue?${queryString}` : "/api/queue";

    const result = await axiosDefault.get(url);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Add to walk-in queue
export const addToWalkInQueueApi = async (payload) => {
  try {
    // Client-side validation
    if (!payload.name || !payload.service) {
      throw new Error("Missing required queue information");
    }

    const result = await axiosDefault.post("/api/queue", payload);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};
