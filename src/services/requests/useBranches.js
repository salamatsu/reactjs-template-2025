import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addBranchApi,
  getAllBranchesApi,
  getBranchByIdApi,
  updateBranchApi,
  updateBranchStatusApi,
} from "../api/branchesApi";

export const useGetAllBranchesApi = () => {
  return useQuery({
    queryKey: ["getAllBranchesApi"],
    queryFn: getAllBranchesApi,
    placeholderData: null,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    initialData: [],
    placeholderData: [],
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};

export const useGetBranchByIdApi = (branchId) => {
  return useQuery({
    queryKey: ["getBranchByIdApi"],
    queryFn: () => getBranchByIdApi(branchId),
    placeholderData: null,
    retry: 1,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    initialData: {},
    placeholderData: {},
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};

export const useAddBranchApi = () => {
  return useMutation({
    mutationFn: addBranchApi,
    retry: false,
  });
};

export const useUpdateBranchApi = () => {
  return useMutation({
    mutationFn: updateBranchApi,
    retry: false,
  });
};

export const useUpdateBranchStatusApi = () => {
  return useMutation({
    mutationFn: updateBranchStatusApi,
    retry: false,
  });
};
