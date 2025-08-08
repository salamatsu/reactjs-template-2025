import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllUsersApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/usersApi";

// Get all users
export const useGetAllUsers = (options = {}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
    placeholderData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    onError: (error) => {
      console.error("Failed to fetch users:", error);
    },
    ...options,
  });
};

// Get user by ID
export const useGetUserById = (userId, options = {}) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdApi(userId),
    placeholderData: [],
    enabled: !!userId, // Only run query if userId is provided
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
    ...options,
  });
};

// Create user mutation
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserApi,
    retry: false,
  });
};

// Update user mutation
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ userId, data }) => updateUserApi(userId, data),
    retry: false,
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUserApi,
    retry: false,
  });
};
