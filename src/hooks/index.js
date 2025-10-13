// Centralized exports for all custom hooks

// Socket.IO hooks
export { useSocketEvent } from "./useSocketEvent";

// Existing hooks
export { default as useAddressData } from "./useAddressData";
export { default as useFilters } from "./useFilters";
export { default as useModal } from "./useModal";
export { default as useStyleTable } from "./useStyleTable";
export { default as useTableData } from "./useTableData";
export { default as useWindowSize } from "./useWindowSize";

// Context hooks
export { useSocket } from "../contexts/SocketContext";
