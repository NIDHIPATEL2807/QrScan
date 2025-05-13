import { useEffect } from "react";

const useWebSocket = (url, onMessage) => {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket Connected ✅");
    };

    socket.onmessage = (event) => {
      console.log("Received:", event.data);
      if (onMessage) onMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected ❌");
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
};

export default useWebSocket;
