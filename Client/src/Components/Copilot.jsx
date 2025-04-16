import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";

const Copilot = () => {
  const [messages, setMessages] = useState([
    { sender: "copilot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "copilot",
          text: "That's a great question! Let me find that out.",
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className=" w-full  mx-15  p-4 bg-gray-900 shadow-xl rounded-2xl flex flex-col h-[97vh]">
      <div className="text-xl text-white font-bold mb-4">Copilot Assistant</div>

      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-gray-900 rounded-xl">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "copilot" && (
              <Bot className="w-5 h-5 text-violet-500 mt-1" />
            )}
            <div
              className={`px-4 py-2 rounded-xl text-sm max-w-xs ${
                msg.sender === "user"
                  ? "bg-violet-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <User className="w-5 h-5 text-gray-500 mt-1" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 text-white border border-gray-300 rounded-l-xl focus:outline-none"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-violet-500 text-white px-4 py-2 rounded-r-xl hover:bg-violet-700"
          onClick={handleSend}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Copilot;
