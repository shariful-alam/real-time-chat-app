"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import { Message } from "../../../types";

export default function UserChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/api/messages/${userId}`);
      if (response.ok) {
        const data: Message[] = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();

    if (socket) {
      socket.on("message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });
    }
  }, [socket, userId]);

  const sendMessage = () => {
    const messageData: Message = {
      from: "You",
      to: userId,
      message,
      timestamp: new Date().toISOString(),
    };
    socket.emit("message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-lg">Chat with {userId}</h1>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded ${
              msg.from === "You" ? "bg-blue-100 text-right" : "bg-gray-200"
            }`}
          >
            <strong>{msg.from}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <footer className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
