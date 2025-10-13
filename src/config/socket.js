import { io } from "socket.io-client";

// Socket.IO configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// Create socket instance with default options
export const socket = io(SOCKET_URL, {
  autoConnect: false, // Don't connect automatically
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ["websocket", "polling"],
});

// Socket event listeners for debugging
if (import.meta.env.VITE_APP_ENV === "development") {
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
}

export default socket;
