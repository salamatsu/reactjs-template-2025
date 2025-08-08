import { useMutation, useQuery } from "@tanstack/react-query";
import { getWalkInQueueApi, addToWalkInQueueApi } from "../api/queueApi";

// Get walk-in queue
export const useGetWalkInQueue = (branchId = null, options = {}) => {
  return useQuery({
    queryKey: ["walkInQueue", branchId],
    queryFn: () => getWalkInQueueApi(branchId),
    placeholderData: [],
    staleTime: 1 * 60 * 1000, // 1 minute (queue changes frequently)
    cacheTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
    retry: 2,
    onError: (error) => {
      console.error("Failed to fetch walk-in queue:", error);
    },
    ...options,
  });
};

// Add to walk-in queue mutation
export const useAddToWalkInQueue = () => {
  return useMutation({
    mutationFn: addToWalkInQueueApi,
    retry: false,
  });
};
