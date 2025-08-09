import { useQuery } from "@tanstack/react-query";
import { getAllAdditionalServices } from "../api/additionalServices";

export const useGetAllAdditionalServices = () => {
  return useQuery({
    queryKey: ["getAllAdditionalServices"],
    queryFn: () => getAllAdditionalServices(),
    placeholderData: [],
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};
