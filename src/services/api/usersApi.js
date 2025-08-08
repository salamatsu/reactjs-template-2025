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
  if (error.response?.status === 409) {
    throw new Error("Data already exists");
  }
  throw new Error(error.message || "An unexpected error occurred");
};

// Get all users
export const getAllUsersApi = async () => {
  try {
    const result = await axiosDefault.get("/api/users");
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Get user by ID
export const getUserByIdApi = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const result = await axiosDefault.get(`/api/users/${userId}`);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Create user
export const createUserApi = async (payload) => {
  try {
    // Client-side validation
    if (!payload.name || !payload.email) {
      throw new Error("Name and email are required");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      throw new Error("Please provide a valid email address");
    }

    const result = await axiosDefault.post("/api/users", payload);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update user
export const updateUserApi = async (userId, payload) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Basic email validation if email is provided
    if (payload.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email)) {
        throw new Error("Please provide a valid email address");
      }
    }

    const result = await axiosDefault.put(`/api/users/${userId}`, payload);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete user
export const deleteUserApi = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const result = await axiosDefault.delete(`/api/users/${userId}`);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};
