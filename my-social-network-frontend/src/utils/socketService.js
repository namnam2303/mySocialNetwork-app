import { useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

export const useWebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const connect = useCallback(() => {
    const socket = new SockJS("/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      setConnected(true);
      console.log("Connected: " + frame);

      stompClient.subscribe("/topic/public", (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Subscribe to other topics as needed
      // For example:
      // stompClient.subscribe('/topic/newPost', handleNewPost);
      // stompClient.subscribe('/topic/newComment', handleNewComment);
      // stompClient.subscribe('/user/topic/private', handlePrivateMessage);
    });
  }, []);

  const disconnect = useCallback(() => {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
  }, []);

  const sendMessage = useCallback(
    (message) => {
      if (stompClient && connected) {
        stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
      } else {
        console.error("Not connected to WebSocket");
      }
    },
    [connected]
  );

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connected,
    connect,
    disconnect,
    sendMessage,
    messages,
  };
};
