import React, { useState } from "react";
import { Message } from "../types";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function ChatWindow({
  messages,
  onSendMessage,
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState<string>("");

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
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
      <div className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message"
            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
