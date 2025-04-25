import React, { useState, useEffect, useRef } from "react";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("receive-message", ({ message, sender }) => {
      setMessages((prev) => [...prev, { message, sender }]);
    });

    return () => socket.off("receive-message");
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      socket.emit("send-message", { room: "codlet-room", message: input });
      setMessages((prev) => [...prev, { message: input, sender: "You" }]);
      setInput("");
    }
  };

  return (
    <div className="w-[100] h-[98vh] bg-gray-900 ml-16 flex flex-col border rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-3 bg-gray-900 rounded-t-lg">
        <h2 className="text-white font-bold">Live Chat</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-900">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
                msg.sender === "You"
                  ? "bg-violet-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <strong className="block text-xs mb-1">
                {msg.sender !== "You" ? msg.sender : ""}
              </strong>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-3 border-b bg-gray-900 gap-2">
        <input
          type="text"
          className="flex-1 p-2 text-white border border-gray-300 rounded-l-xl focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-violet-500 hover:bg-violet-700 transition text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
