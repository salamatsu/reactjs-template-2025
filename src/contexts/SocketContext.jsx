import { createContext, useContext, useEffect, useState } from "react";
import socket from "../config/socket";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    // Connect socket when provider mounts
    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessage = (data) => {
      setLastMessage(data);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.disconnect();
    };
  }, []);

  const emit = (event, data) => {
    if (socket.connected) {
      socket.emit(event, data);
    } else {
      console.warn("Socket is not connected");
    }
  };

  const on = (event, callback) => {
    socket.on(event, callback);
  };

  const off = (event, callback) => {
    socket.off(event, callback);
  };

  const value = {
    socket,
    isConnected,
    lastMessage,
    emit,
    on,
    off,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
