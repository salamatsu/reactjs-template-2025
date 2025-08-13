import { useMutation, useQuery } from "@tanstack/react-query";
import { addBookingApi, getBookingByBookingIdApi, getBookingStatusApi } from "../api/bookingsApi";


export const useAddBookingApi = () => {
  return useMutation({
    mutationFn: addBookingApi,
    retry: false,
  });
};


export const useGetBookingByBookingIdApi = (bookingId) => {
  return useQuery({
    queryKey: ["getBookingByBookingIdApi"],
    queryFn: () => getBookingByBookingIdApi(bookingId),
    placeholderData: [],
    retry: 1,
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};

export const useGetBookingStatusApi = (bookingId) => {
  return useQuery({
    queryKey: ["getBookingStatusApi"],
    queryFn: () => getBookingStatusApi(bookingId),
    placeholderData: [],
    retry: 1,
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};


export const useGetBookingPaymentsApi = (bookingId) => {
  return useQuery({
    queryKey: ["getBookingPaymentsApi"],
    queryFn: () => getBookingPaymentsApi(bookingId),
    placeholderData: [],
    retry: 1,
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};

export const useGetBookingChargesApi = (bookingId) => {
  return useQuery({
    queryKey: ["getBookingChargesApi"],
    queryFn: () => getBookingChargesApi(bookingId),
    placeholderData: [],
    retry: 1,
    onError: (error) => {
      console.error("Failed to fetch user:", error);
    },
  });
};

