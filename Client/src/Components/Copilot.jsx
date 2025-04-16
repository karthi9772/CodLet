import React, { useState, useEffect } from "react";
import { Send, Bot, User, Copy } from "lucide-react";
import axios from "../Api/Pollinations";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Copilot = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [{ sender: "copilot", text: "Hi! How can I help you today?" }];
  });
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages)); // Save to localStorage
      return updatedMessages;
    });
    setInput("");

    try {
      const res = await axios.get(`/${encodeURIComponent(input)}`);
      const reply = res.data;

      setMessages((prev) => {
        const updatedMessages = [...prev, { sender: "copilot", text: reply }];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages)); // Save to localStorage
        return updatedMessages;
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "copilot",
          text: "Sorry, I couldn’t fetch a response at the moment.",
        },
      ]);
    }
  };

  const renderMessageText = (text) => {
    const codeRegex = /```(.*?)\n([\s\S]*?)```/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      const [fullMatch, language, code] = match;
      const start = match.index;

      if (start > lastIndex) {
        parts.push(text.slice(lastIndex, start));
      }

      parts.push(
        <div key={start} className="relative">
          <SyntaxHighlighter
            language={language || "javascript"}
            style={dracula}
            customStyle={{ borderRadius: "0.5rem", fontSize: "0.8rem" }}
          >
            {code.trim()}
          </SyntaxHighlighter>
          <button
            className="absolute top-2 right-2 bg-violet-500 text-white px-2 py-1 text-xs rounded-md hover:bg-violet-700"
            onClick={() => handleCopy(code.trim())}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      );

      lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.map((part, i) =>
      typeof part === "string" ? <span key={i}>{part}</span> : part
    );
  };

  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset "copied" after 2 seconds
      })
      .catch(() => {
        alert("Failed to copy text");
      });
  };

  return (
    <div className="w-full mx-15 p-4 bg-gray-900 shadow-xl rounded-2xl flex flex-col h-[97vh]">
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
              className={`px-4 py-2 rounded-xl text-sm max-w-xs whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-violet-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {renderMessageText(msg.text)}
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
          className="flex-1 p-2 text-white border border-gray-300 rounded-l-xl bg-gray-800 focus:outline-none"
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

      {copied && (
        <div className="text-sm text-green-500 mt-2">
          Code copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Copilot;
