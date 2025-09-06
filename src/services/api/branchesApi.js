import { handleApiError } from "../../utils/handlers";
import { createAxiosInstanceWithInterceptor } from "./axios";

const axiosDefault = createAxiosInstanceWithInterceptor("data");

export const getAllBranchesApi = async () => {
  try {
    const result = await axiosDefault.get(`/api/branches`);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getBranchByIdApi = async (branchId) => {
  try {
    const result = await axiosDefault.get(`/api/branches/${branchId}`);
    return result.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addBranchApi = async (payload) => {
  // { branchCode, branchName, address, city, region, contactNumber, email, operatingHours, amenities}
  try {
    const result = await axiosDefault.post("/api/branches/add", payload);
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateBranchApi = async ({ branchId, ...payload }) => {
  // { branchId, branchCode, branchName, address, city, region, contactNumber, email, operatingHours, amenities}
  try {
    const result = await axiosDefault.put(
      `/api/branches/${branchId}/update`,
      payload
    );
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateBranchStatusApi = async ({ branchId, ...payload }) => {
  // { branchId, status} // 0 inactive 1 active
  try {
    const result = await axiosDefault.patch(
      `/api/branches/${branchId}/status`,
      payload
    );
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
