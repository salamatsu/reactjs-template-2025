import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRoomTypeApi,
  getAllRoomTypesApi,
  getRoomTypeByIdApi,
  getRoomTypesByBranchIdApi,
  updateRoomTypeApi,
  updateRoomTypeStatusApi,
} from "../api/roomTypesApi";

// Query Keys
export const ROOM_TYPES_QUERY_KEYS = {
  all: ["roomTypes"],
  lists: () => [...ROOM_TYPES_QUERY_KEYS.all, "list"],
  list: (filters) => [...ROOM_TYPES_QUERY_KEYS.lists(), { filters }],
  details: () => [...ROOM_TYPES_QUERY_KEYS.all, "detail"],
  detail: (id) => [...ROOM_TYPES_QUERY_KEYS.details(), id],
  byBranch: (branchId) => [...ROOM_TYPES_QUERY_KEYS.all, "branch", branchId],
};

// Get all room types
export const useGetAllRoomTypesApi = () => {
  return useQuery({
    queryKey: ROOM_TYPES_QUERY_KEYS.lists(),
    queryFn: getAllRoomTypesApi,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    initialData: [],
    onError: (error) => {
      console.error("Failed to fetch room types:", error);
    },
  });
};

// Get room type by ID
export const useGetRoomTypeByIdApi = (roomTypeId) => {
  return useQuery({
    queryKey: ROOM_TYPES_QUERY_KEYS.detail(roomTypeId),
    queryFn: () => getRoomTypeByIdApi(roomTypeId),
    enabled: Boolean(roomTypeId),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error(`Failed to fetch room type ${roomTypeId}:`, error);
    },
  });
};

// Get room types by branch ID
export const useGetRoomTypesByBranchIdApi = (branchId) => {
  return useQuery({
    queryKey: ROOM_TYPES_QUERY_KEYS.byBranch(branchId),
    queryFn: () => getRoomTypesByBranchIdApi(branchId),
    enabled: Boolean(branchId),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    initialData: [],
    onError: (error) => {
      console.error(
        `Failed to fetch room types for branch ${branchId}:`,
        error
      );
    },
  });
};

// Add room type mutation
export const useAddRoomTypeApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRoomTypeApi,
    retry: false,
    onSuccess: (data) => {
      // Invalidate and refetch room types queries
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_QUERY_KEYS.all });

      // If we know the branch, also invalidate branch-specific queries
      if (data?.data?.branchId) {
        queryClient.invalidateQueries({
          queryKey: ROOM_TYPES_QUERY_KEYS.byBranch(data.data.branchId),
        });
      }
    },
    onError: (error) => {
      console.error("Failed to add room type:", error);
    },
  });
};

// Update room type mutation
export const useUpdateRoomTypeApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomTypeId, payload }) =>
      updateRoomTypeApi(roomTypeId, payload),
    retry: false,
    onSuccess: (data, variables) => {
      const { roomTypeId } = variables;

      // Invalidate and refetch room types queries
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_QUERY_KEYS.all });

      // Update the specific room type cache
      queryClient.invalidateQueries({
        queryKey: ROOM_TYPES_QUERY_KEYS.detail(roomTypeId),
      });

      // If we know the branch, also invalidate branch-specific queries
      if (data?.data?.branchId) {
        queryClient.invalidateQueries({
          queryKey: ROOM_TYPES_QUERY_KEYS.byBranch(data.data.branchId),
        });
      }
    },
    onError: (error, variables) => {
      console.error("Failed to update room type:", error);
    },
  });
};

// Update room type status mutation
export const useUpdateRoomTypeStatusApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomTypeId, isActive }) =>
      updateRoomTypeStatusApi(roomTypeId, { isActive }),
    retry: false,
    onSuccess: (data, variables) => {
      const { roomTypeId } = variables;

      // Invalidate and refetch room types queries
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_QUERY_KEYS.all });

      // Update the specific room type cache
      queryClient.invalidateQueries({
        queryKey: ROOM_TYPES_QUERY_KEYS.detail(roomTypeId),
      });

      // If we know the branch, also invalidate branch-specific queries
      if (data?.data?.branchId) {
        queryClient.invalidateQueries({
          queryKey: ROOM_TYPES_QUERY_KEYS.byBranch(data.data.branchId),
        });
      }

      // Call custom onSuccess if provided
    },
    onError: (error, variables) => {
      console.error("Failed to update room type status:", error);
    },
  });
};
